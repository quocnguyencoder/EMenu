const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  productionBrowserSourceMaps: true,
  swcMinify: true,
})
