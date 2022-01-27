/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["links.papareact.com"],
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ["image/avif", "image/webp"],
	},
};

module.exports = nextConfig
