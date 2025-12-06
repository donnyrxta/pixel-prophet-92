import https from 'https';
import http from 'http';

const urlStr = process.argv[2] || 'https://sohoconnect.co.zw/health.json';
const url = new URL(urlStr);

console.log(`Checking health of ${urlStr}...`);

const client = url.protocol === 'https:' ? https : http;

const req = client.get(urlStr, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.status === 'ok') {
          console.log('Health check PASSED');
          process.exit(0);
        } else {
          console.error('Health check FAILED: Status not ok', json);
          process.exit(1);
        }
      } catch (e) {
        console.error('Health check FAILED: Invalid JSON', e);
        process.exit(1);
      }
    });
  } else {
    console.error(`Health check FAILED: Status code ${res.statusCode}`);
    process.exit(1);
  }
});

req.on('error', (e) => {
  console.error(`Health check FAILED: ${e.message}`);
  process.exit(1);
});
