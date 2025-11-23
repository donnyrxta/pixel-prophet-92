/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
  },
};

module.exports = nextConfig;
