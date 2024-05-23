/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'files.meoagent.com',
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
