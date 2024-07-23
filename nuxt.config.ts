// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Weather app || Nuxt 3",

    },
  },
  css: ["bootstrap-icons/font/bootstrap-icons.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
  },
});
