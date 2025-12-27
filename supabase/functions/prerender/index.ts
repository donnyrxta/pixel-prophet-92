import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PRERENDER_TOKEN = Deno.env.get('PRERENDER_TOKEN');
const PRERENDER_SERVICE_URL = 'https://service.prerender.io/';
const SITE_URL = 'https://sohoconnect.co.zw';

// Bot user agents that should receive pre-rendered content
const BOT_USER_AGENTS = [
  'googlebot',
  'yahoo! slurp',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'screaming frog seo spider',
  'ahrefs',
  'semrush',
  'mj12bot'
];

// Extensions that should NOT be prerendered
const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif', 
  '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar', 
  '.exe', '.wmv', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav', 
  '.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat', 
  '.dmg', '.iso', '.flv', '.m4v', '.torrent', '.woff', '.woff2', 
  '.ttf', '.svg', '.eot', '.webp', '.webm', '.json'
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function shouldPrerender(url: string, userAgent: string): boolean {
  // Check if it's a bot
  if (!isBot(userAgent)) {
    return false;
  }
  
  // Check for ignored extensions
  const pathname = new URL(url).pathname.toLowerCase();
  if (IGNORED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return false;
  }
  
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, userAgent } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ error: 'URL is required', prerendered: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ua = userAgent || '';
    console.log(`Prerender check - URL: ${url}, UserAgent: ${ua.substring(0, 100)}...`);
    
    // Check if we should prerender
    if (!shouldPrerender(url, ua)) {
      console.log('Not a bot or ignored extension, skipping prerender');
      return new Response(
        JSON.stringify({ prerendered: false, reason: 'Not a bot or ignored extension' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!PRERENDER_TOKEN) {
      console.error('PRERENDER_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Prerender service not configured', prerendered: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct the prerender URL
    const targetUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
    const prerenderUrl = `${PRERENDER_SERVICE_URL}${encodeURIComponent(targetUrl)}`;
    
    console.log(`Fetching prerendered content from: ${prerenderUrl}`);

    // Fetch from Prerender.io
    const response = await fetch(prerenderUrl, {
      method: 'GET',
      headers: {
        'X-Prerender-Token': PRERENDER_TOKEN,
        'User-Agent': ua,
      },
    });

    if (!response.ok) {
      console.error(`Prerender.io returned status: ${response.status}`);
      return new Response(
        JSON.stringify({ 
          error: `Prerender service error: ${response.status}`, 
          prerendered: false 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();
    console.log(`Successfully fetched prerendered content (${html.length} bytes)`);

    return new Response(
      JSON.stringify({ 
        html, 
        prerendered: true,
        cached: response.headers.get('X-Prerender-Cached') === 'true'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in prerender function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage, prerendered: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
