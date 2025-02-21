export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  pages: true,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    pokemonTcgApiKey: process.env.NUXT_POKEMON_TCG_API_KEY,
    public: {
      pokemonTcgApiBase: 'https://api.pokemontcg.io/v2' // Asegúrate de que esté bien definida
    }
  }
})
