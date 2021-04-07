const HTTP_ENDPOINT = "https://tapi.litekart.in";
export default {
  mode: "universal",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  css: [],
  ssr: false,
  components: true,
  plugins: [{ src: "~/plugins/directives.js", ssr: false }],
  buildModules: ["@nuxtjs/axios", "@nuxtjs/tailwindcss", "nuxt-webfontloader"],
  modules: ["@nuxtjs/pwa", "@nuxtjs/dotenv"],
  axios: {
    proxy: true
  },
  proxy: {
    "/graphql": HTTP_ENDPOINT,
    "/api": HTTP_ENDPOINT
  },
  webfontloader: {
    google: {
      families: ["Inter:400,700&display=swap"]
    }
  },
  build: {
    extend(config, ctx) {}
  }
};
