const webpack = require("webpack");

module.exports = {
  debug: true,
  env: {
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    PUBLIC_FORUM_URL: process.env.PUBLIC_FORUM_URL,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    MEDIABASE_URL: process.env.MEDIABASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID
  },
  axios: {
    baseURL: process.env.BASE_URL,
    browserBaseURL: process.env.BROWSER_BASE_URL
  },
  head: {
    title: "Bitcore Gaming",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Bienvenido a la resistencia del gaming"
      }
    ],
    script: [
      {
        src: "https://unpkg.com/aos@2.3.1/dist/aos.js"
      }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/aos@2.3.1/dist/aos.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:400,500,700,900"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "favicon.png"
      }
    ]
  },
  loading: {
    color: "#666aaa"
  },
  css: [
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css"
  ],
  plugins: [
    { src: "plugins/VueCropper", ssr: false },
    { src: "plugins/lineClamp", ssr: false },
    { src: "plugins/wysiwyg", ssr: false },
    { src: "plugins/infinite-loading", ssr: false },
    { src: "plugins/datepicker", ssr: false },
    { src: "plugins/GAnalytics.js", ssr: false },
    "plugins/SocialButtons",
    "plugins/imagePath",
    "plugins/filters",
    "plugins/notify",
    "plugins/axios"
  ],
  modules: [
    "nuxt-facebook-pixel-module",
    "@nuxtjs/toast",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "bootstrap-vue/nuxt",
    "nuxt-fontawesome"
  ],
  // TODO: IMPORTANT add "this.$fb.enable()" on cookie accept, that means we have permission to track
  // TODO: https://github.com/WilliamDASILVA/nuxt-facebook-pixel-module
  facebook: {
    track: "PageView",
    pixelId: "FACEBOOK_PIXEL_ID",
    disabled: false
  },
  toast: {
    position: "top-right",
    duration: 1500
  },
  fontawesome: {
    component: "fa"
  },
  styleResources: {
    scss: ["./assets/styles/_mixins.scss", "./assets/styles/global.scss"]
  },
  router: {
    middleware: "auth"
  },
  build: {
    vendor: ["jquery", "bootstrap", "vue-image-crop-upload"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        _: "lodash"
      })
    ],
    extend(config, ctx) {}
  }
};
