
const axios = require('axios')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/app.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/index',
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/dfp.js', ssr: false },
    { src: '~plugins/youtube-embed.js', ssr: false },
    { src: '~plugins/toggle-button.js', ssr: false },
    { src: '~plugins/v-click-outside.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    /*['@nuxtjs/google-adsense', {
      id: 'ca-pub-7630454062211213',
      pageLevelAds: true,
    }],*/
    '@nuxtjs/sitemap',
    'nuxt-device-detect',
    'cookie-universal-nuxt',
    '@nuxtjs/proxy'
  ],


  sitemap: [
    {
      path: '/sitemap.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/Service'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=1').then(res => res.data.map(id => '/videos/' + id));
      },
    },
    {
      path: '/sitemap2.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/**'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=2').then(res => res.data.map(id => '/videos/' + id));
      },
    },
    {
      path: '/sitemap3.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/**'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=3').then(res => res.data.map(id => '/videos/' + id));
      },
    },
    {
      path: '/sitemap4.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/**'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=4').then(res => res.data.map(id => '/videos/' + id));
      },
    },
    {
      path: '/sitemap5.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/**'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=5').then(res => res.data.map(id => '/videos/' + id));
      },
    },
    {
      path: '/sitemap6.xml',
      hostname: 'http://www.ytdeo.com',
      exclude: ['/**'],
      gzip: true,
      defaults: {
        changefreq: 'hourly',
        priority: 0.80,
        lastmod: new Date()
      },
      routes () {
        return axios.get('http://34.67.204.12/videos/id/all/?pageToken=6').then(res => res.data.map(id => '/videos/' + id));
      },
    },
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST || '0.0.0.0', // default: localhost
  },

  axios: {
    proxy: true
  },
  proxy: {
    '/api/': { target: 'http://34.67.204.12/', pathRewrite: {'^/api/': ''}, changeOrigin: true},
    '/apiEx/' : { target: 'https://youtube.com/', pathRewrite: {'^/apiEx/': ''}, changeOrigin: true},
  },
}
