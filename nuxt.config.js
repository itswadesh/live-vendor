import { I18N } from './config/lang'
import path from 'path'
import fs from 'fs'
import {
  HTTP_ENDPOINT,
  ONESIGNAL_APP_ID,
  WWW_URL,
  head,
  dev,
  tailwindcss,
  PORT,
} from './shared/config/index'
const whitelistPatterns = [/(slick-+|swal2-)/]
export default {
  server: {
    host: '0.0.0.0',
    port: 3300,
    overlay: {
      warnings: false,
      errors: true,
    },
    // https: {
    //   key: fs.readFileSync('./cert/key.pem'),
    //   cert: fs.readFileSync('./cert/cert.pem'),
    // },
  },
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
  plugins: [
    { src: '~/plugins/directives.js', ssr: false },
    { src: '~/plugins/filters.js', mode: 'client' },
    { src: '~/plugins/vue-mq.js' },
    { src: '~/plugins/lazy.js', mode: 'client' },
  ],
  buildModules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    ['nuxt-i18n', I18N],
    // 'nuxt-vite',
  ],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
  ],
  pageTransition: 'slide-bottom',
  layoutTransition: 'slide-bottom',
  toast: {
    singleton: true,
  },
  axios: {
    proxy: true,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${WWW_URL}/graphql`,
        browserHttpEndpoint: '/graphql',
        wsEndpoint: `${HTTP_ENDPOINT.replace('http', 'ws')}/graphql`,
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
