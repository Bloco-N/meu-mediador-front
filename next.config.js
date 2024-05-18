/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage-production-7c83.up.railway.app',
          port: '',
          pathname: '/wwwroot/uploads/**',
        },
      ],
    },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  i18n:{
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
  },
}

module.exports = nextConfig
