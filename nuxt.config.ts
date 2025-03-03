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
          href: 'images/pokeball.png',
        }
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        }
      ],
      title: 'Pokemon TCG Portal'
    }
  },
  css: ['~/assets/css/main.css'],
  pages: true,
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  runtimeConfig: {
    pokemonTcgApiKey: process.env.NUXT_POKEMON_TCG_API_KEY,
    public: {
      pokemonTcgApiBase: 'https://api.pokemontcg.io/v2',
      backendBaseUrl: 'http://localhost:8000/api'  // URL base de tu backend Django
    }
  },
});
