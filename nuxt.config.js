import {
  HTTP_ENDPOINT,
  ONESIGNAL_APP_ID,
  WWW_URL,
  head,
  dev,
  tailwindcss,
  PORT,
  GOOGLE_ANALYTICS_ID,
} from './shared/config/index'
const whitelistPatterns = [/(slick-+|swal2-)/]
export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  css: [],
  ssr: false,
  components: true,
  plugins: [
    { src: '~/plugins/directives.js', ssr: false },
    { src: '~/plugins/filters.js', mode: 'client' },
    { src: '~/plugins/vue-mq.js' },
    { src: '~/plugins/lazy.js', mode: 'client' },
  ],
  buildModules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    'nuxt-webfontloader',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    'vue-social-sharing/nuxt',
    // 'nuxt-vite',
  ],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt',
  ],
  pageTransition: 'slide-bottom',
  layoutTransition: 'slide-bottom',
  toast: {
    singleton: true,
  },
  purgeCSS: {
    // whitelist,
    whitelistPatterns,
  },
  axios: {
    proxy: true,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${WWW_URL}/graphql`,
        browserHttpEndpoint: '/graphql',
        // wsEndpoint: server.replace('http', 'ws') + '/graphql',
      },
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
  },
  proxy: {
    '/graphql': HTTP_ENDPOINT,
    '/api': HTTP_ENDPOINT,
  },
  webfontloader: {
    google: {
      families: ['Inter:400,700&display=swap'],
    },
  },
  build: {
    extend(config, ctx) {},
  },
}
