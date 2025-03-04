export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/pokeball.png', // Agregué "/" para evitar problemas con rutas relativas
        }
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        }
      ],
      title: 'Pokemon TCG Portal',
    },
  },
  css: ['~/assets/css/main.css'],
  pages: true,
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n', // Asegúrate de que esté aquí
  ],
  i18n: {
    lazy: true,
    langDir: 'locales', // Asegura que existe 'locales/en.js' y 'locales/es.js'
    locales: [
      { code: 'en', iso: 'en', name: 'English', file: 'en.js' },
      { code: 'es', iso: 'es', name: 'Español', file: 'es.js' },
    ],
    defaultLocale: 'es',
    strategy: 'no_prefix',
    vueI18n: './i18n/config.js',
  }, // ← Se agregó la coma que faltaba aquí
  runtimeConfig: {
    pokemonTcgApiKey: process.env.NUXT_POKEMON_TCG_API_KEY,
    public: {
      pokemonTcgApiBase: 'https://api.pokemontcg.io/v2',
      backendBaseUrl: 'http://localhost:8000/api', // URL base de tu backend Django
    },
  },
});
