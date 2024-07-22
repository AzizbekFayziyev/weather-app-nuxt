// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ['bootstrap-icons/font/bootstrap-icons.css'],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
  },
});
