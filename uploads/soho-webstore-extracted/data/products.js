/**
 * Sample product catalogue for the Soho Connect webstore. In a real
 * application these records would be fetched from a CMS or e‑commerce
 * backend. Each product includes a slug used in the URL, a name, a
 * category, a short description, a price, and a placeholder image
 * hosted on Unsplash or Pexels. Feel free to replace images with
 * locally hosted assets or CMS media fields.
 */
export const products = [
  {
    slug: 'solar-cctv-kit',
    name: 'Solar CCTV Kit',
    category: 'CCTV & Security',
    categorySlug: 'cctv-security',
    description:
      'Complete solar‑powered surveillance kit including IP cameras, NVR, solar panels and UPS for continuous monitoring.',
    price: 899.99,
    image:
      'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
    /** Additional product images to power the gallery on the product
     * detail page. Duplicate the primary image here as a fallback
     * and provide a couple of alternative angles. These URLs can be
     * replaced with real product shots or CMS media entries. */
    images: [
      'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6461306/pexels-photo-6461306.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6461305/pexels-photo-6461305.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    /** Current stock quantity. When 0 the product will display as
     * "Out of stock" on the product card and disable purchase. */
    stock: 8,
    /** Example product reviews used to render user testimonials on
     * the product detail page. In a real application these would be
     * fetched from your backend or a third‑party service. */
    reviews: [
      { name: 'Tafadzwa K.', rating: 5, comment: 'Easy installation and great solar performance. My farm is secure 24/7.' },
      { name: 'Sarah M.', rating: 4, comment: 'Cameras deliver clear footage even at night. Would love even more storage.' },
    ],
    isBundle: true,
    bundleItems: ['solar-panel', 'ip-camera', 'nvr', 'ups'],
  },
  {
    slug: 'retail-shrinkage-pack',
    name: 'Retail Shrinkage Pack',
    category: 'CCTV & Security',
    categorySlug: 'cctv-security',
    description:
      'Reduce retail losses with a four‑camera IP surveillance system, panic button, compliance signage and weekly health checks.',
    price: 699.5,
    image:
      'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6874582/pexels-photo-6874582.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6874581/pexels-photo-6874581.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 12,
    reviews: [
      { name: 'Rutendo D.', rating: 4, comment: 'Great value pack, cameras are crisp. Compliance signage is very useful.' },
    ],
    isBundle: true,
    bundleItems: ['camera', 'panic-button', 'signage', 'health-check'],
  },
  {
    slug: 'restaurant-launch-kit',
    name: 'Restaurant Launch Kit',
    category: 'Print Products',
    categorySlug: 'print-products',
    description:
      'Jump‑start your eatery with custom menu design, table talkers, delivery stickers, staff caps and a social media starter pack.',
    price: 349.0,
    image:
      'https://images.pexels.com/photos/2611812/pexels-photo-2611812.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2611812/pexels-photo-2611812.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2611811/pexels-photo-2611811.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 5,
    reviews: [
      { name: 'Kudzi P.', rating: 5, comment: 'This kit had everything we needed to open our café! Menus were beautiful.' },
    ],
    isBundle: true,
    bundleItems: ['menu', 'table-talker', 'stickers', 'caps', 'social-pack'],
  },
  {
    slug: 'nfc-smart-business-card',
    name: 'NFC Smart Business Card',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    description:
      'Share your contact details with a single tap. Custom‑branded NFC cards that link to your website, landing page or WhatsApp.',
    price: 19.99,
    image:
      'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1106477/pexels-photo-1106477.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 20,
    reviews: [
      { name: 'Munya N.', rating: 4, comment: 'Works like magic, customers love tapping to get my contact details!' },
      { name: 'Alice T.', rating: 5, comment: 'Sleek design and easy to set up. Received it in two days.' },
    ],
    isBundle: false,
  },
  {
    slug: 'eco-friendly-print-bundle',
    name: 'Eco‑Friendly Print Bundle',
    category: 'Print Products',
    categorySlug: 'print-products',
    description:
      'Promote your brand sustainably with recycled paper flyers, bamboo pens and organic cotton tees printed with soy inks.',
    price: 129.99,
    image:
      'https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3760075/pexels-photo-3760075.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 0,
    reviews: [],
    isBundle: true,
    bundleItems: ['flyers', 'pens', 'tees'],
  },
  {
    slug: 'photo-to-product-calendar',
    name: 'Photo‑to‑Product Calendar',
    category: 'Print Products',
    categorySlug: 'print-products',
    description:
      'Turn cherished photos into bespoke wall calendars. Our AI cleans your images, we print and deliver.',
    price: 34.95,
    image:
      'https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5905875/pexels-photo-5905875.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 15,
    reviews: [
      { name: 'Chenai G.', rating: 4, comment: 'My personalised calendar turned out beautifully. Delivery was quick.' },
    ],
    isBundle: false,
  },
  {
    slug: 'pop-up-shop-starter-kit',
    name: 'Pop‑Up Shop Starter Kit',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    description:
      'Everything you need for a market stall or pop‑up event: roll‑up banner, price cards, branded counter mats and staff tees.',
    price: 249.0,
    image:
      'https://images.pexels.com/photos/4451000/pexels-photo-4451000.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4451000/pexels-photo-4451000.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4450999/pexels-photo-4450999.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 7,
    reviews: [
      { name: 'Brighton L.', rating: 5, comment: 'Fantastic kit for our market stall. Banner and price cards look professional.' },
    ],
    isBundle: true,
    bundleItems: ['banner', 'price-cards', 'counter-mats', 'staff-tees'],
  },
  {
    slug: 'corporate-gift-set',
    name: 'Corporate Gift Set',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    description:
      'Delight clients and employees with executive pens, notebooks, desk calendars and branded power banks packaged elegantly.',
    price: 74.5,
    image:
      'https://images.pexels.com/photos/3560437/pexels-photo-3560437.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3560437/pexels-photo-3560437.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3560436/pexels-photo-3560436.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 25,
    reviews: [
      { name: 'Nomsa K.', rating: 4, comment: 'Our partners loved the gifts. Notebook quality is top notch.' },
    ],
    isBundle: true,
    bundleItems: ['pens', 'notebooks', 'power-banks', 'desk-calendars'],
  },
  {
    slug: 'visitor-management-bundle',
    name: 'Visitor Management Bundle',
    category: 'CCTV & Security',
    categorySlug: 'cctv-security',
    description:
      'Ensure secure visitor flows with smart ID card printing service, lanyards, sign‑in sheets and privacy signage.',
    price: 159.99,
    image:
      'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7709114/pexels-photo-7709114.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 9,
    reviews: [
      { name: 'Blessing S.', rating: 5, comment: 'Our visitor management has never been smoother. Highly recommend.' },
      { name: 'Farai D.', rating: 4, comment: 'Professional and easy to implement. The privacy signage is a nice touch.' },
    ],
    isBundle: true,
    bundleItems: ['id-cards', 'lanyards', 'sign-in-sheets', 'privacy-signage'],
  },
];
