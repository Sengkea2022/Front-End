// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/fonts',
  ],


})