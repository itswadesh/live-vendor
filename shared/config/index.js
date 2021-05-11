export const typingTimeout = 200 // After this delay the search api will be fired
export const loadingTimeout = 500 // Loading indicator will be shown after this delay // used at Loading.vue of admin
export const TITLE = ''
export const DESCRIPTION = ''
export const KEYWORDS = ''
export const sharingLogo = ''
export const recordsPerScroll = 40
export const sorts = [
  { name: 'Relevance', val: null },
  { name: 'Whats New', val: '-createdAt' },
  { name: 'Price low to high', val: 'price' },
  { name: 'Price high to low', val: '-price' },
]

export const { PORT = 3000 } = process.env
export const { WWW_URL = `http://localhost:${PORT}` } = process.env

export const { GOOGLE_ANALYTICS_ID = 'UA-' } = process.env

export const {
  STRIPE_PUBLISHABLE_KEY = 'pk_test_96u8xKulOOGOLoyc2Jt167fH00DENCsyyF',
} = process.env

export const { ONESIGNAL_APP_ID = '' } = process.env

export const { GOOGLE_MAPS_API_KEY = '' } = process.env

export const { HERE_KEY } = process.env

export const dev = process.env.NODE_ENV !== 'production'
export const { HTTP_ENDPOINT = 'https://tapi.litekart.in' } = process.env

export const { AGORA_APP_ID = 'AGORA_APP_ID' } = process.env
export const { AGORA_APP_TOKEN = 'AGORA_APP_TOKEN' } = process.env
export const { AGORA_CHANNEL_NAME = 'AGORA_CHANNEL_NAME' } = process.env

export const head = {
  titleTemplate: `%s`,
  htmlAttrs: { lang: 'en' },
  meta: [
    { charset: 'utf-8' },
    { hid: 'description', name: 'description', content: '' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
    { 'http-equiv': 'Accept-CH', content: 'DPR, Viewport-Width, Width' },
  ],
  // script: [
  //   {
  //     src: 'https://support-dev.tablez.com/supportboard/js/min/jquery.min.js',
  //     defer: true,
  //   },
  //   {
  //     src: 'https://support-dev.tablez.com/supportboard/js/main.js',
  //     defer: true,
  //     id: 'sbinit',
  //   },
  // ],
}
export const tailwindcss = {
  // configPath: '~/shared/config/tailwind.config.js',
  // cssPath: '~/shared/assets/css/tailwind.css',
  exposeConfig: false,
  jit: true,
}
