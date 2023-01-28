require("dotenv").config();
const { join } = require("path");
const { copySync, removeSync } = require("fs-extra");

module.exports = {
  ssr: false,

  srcDir: __dirname,
  
  devServerHandlers: [],

  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + "/api",
    socketUrl:
      process.env.MIX_SOCKET_URL || process.env.MIX_SOCKET_URL + "wss://",
    appName: process.env.APP_NAME || "Vide0Date",
    appLocale: process.env.APP_LOCALE || "en",
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
  },

  head: {
    title: "24/7 video speed dating | Vide0date",
    titleTemplate: "%s - " + process.env.APP_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Our goal is to help you get a video speed date within 5 minutes by just providing you with your age and gender. Click here to try our video dating app.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.png" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",
      },
    ],
  },

  loading: { color: "#007bff" },

  router: {
    middleware: ["locale", "check-auth"],
  },

  css: [{ src: "~assets/sass/app.scss", lang: "scss" }],
  plugins: [
    "~/plugins/vuesax",
    "~plugins/i18n",
    "~plugins/vform",
    "~plugins/axios",
    "~plugins/fontawesome",
    "~plugins/nuxt-client-init",
    "~/plugins/vee-validate.js",
    { src: "~plugins/bootstrap", mode: "client" },
  ],

  modules: ["@nuxtjs/router", "@nuxtjs/recaptcha"],

  recaptcha: {
    /* reCAPTCHA options */
    version: 2,
    siteKey: "6LcPvpkjAAAAAC-9kx_z5f8rePMz-YmFY_jHINvr",
  },

  build: {
    extractCSS: true,
    transpile: ["vee-validate/dist/rules"],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
  },
  server: {
    host: "0.0.0.0",
    port: process.env.APP_PORT,
  },
  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === "spa"
        ) {
          const publicDir = join(
            generator.nuxt.options.rootDir,
            "public",
            "_nuxt"
          );
          removeSync(publicDir);
          copySync(
            join(generator.nuxt.options.generate.dir, "_nuxt"),
            publicDir
          );
          copySync(
            join(generator.nuxt.options.generate.dir, "200.html"),
            join(publicDir, "index.html")
          );
          removeSync(generator.nuxt.options.generate.dir);
        }
      },
    },
  },
};
