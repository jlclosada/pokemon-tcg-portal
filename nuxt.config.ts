export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Fecha de compatibilidad
  app: {
    head: {
      htmlAttrs: {
        lang: 'es', // Atributo lang para SEO
      },
      link: [
        {
          rel: 'stylesheet', // Etiqueta link para las hojas de estilos
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', // Fuente de Google Fonts
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;600;800&display=swap'
        },
        {
          rel: 'icon', // Etiqueta link para el favicon
          type: 'image/png', // Tipo de archivo
          href: '/images/pokeball.png', // Ruta del archivo
        }
      ],
      meta: [
        {
          name: 'viewport', // Etiqueta meta para la compatibilidad con dispositivos móviles
          content: 'width=device-width, initial-scale=1', // Contenido de la etiqueta
        },
        {
          name: 'description', // Etiqueta meta para la descripción
          content: 'Explora la Pokédex, colecciona cartas del TCG y descubre todo sobre el mundo Pokémon.', // Contenido de la etiqueta
        },
        {
          name: 'theme-color', // Color del tema para navegadores compatibles
          content: '#1f2937', // Color oscuro
        },
        {
          property: 'og:title', // Título para compartir en redes sociales
          content: 'Pokémon TCG Portal', // Contenido del título
        },
        {
          property: 'og:description', // Descripción para compartir en redes sociales
          content: 'Explora la Pokédex, colecciona cartas del TCG y descubre todo sobre el mundo Pokémon.', // Contenido de la descripción
        },
        {
          property: 'og:type', // Tipo de objeto para Open Graph
          content: 'website', // Contenido del tipo
        },
      ],
      title: 'Pokémon TCG Portal', // Título de la aplicación
    },
  },
  css: ['~/assets/css/main.css'], // Archivo de estilos personalizado
  pages: true, // Habilita la carga de páginas de forma dinámica
  devtools: { enabled: false }, // Deshabilita las DevTools
  modules: [ // Módulos de Nuxt.js
    '@nuxt/ui', // Módulo de Nuxt UI
    '@nuxtjs/tailwindcss', // Módulo de Tailwind CSS
    '@pinia/nuxt', // Módulo de Pinia
    '@nuxtjs/color-mode', // Módulo de Color Mode
    '@nuxtjs/i18n', // Módulo de i18n
  ],
  i18n: {
    lazy: true, // Carga los idiomas de forma dinámica
    langDir: 'locales', // Directorio de los archivos de idioma
    locales: [ // Configuración de los idiomas
      { code: 'en', iso: 'en', name: 'English', file: 'en.js' },
      { code: 'es', iso: 'es', name: 'Español', file: 'es.js' },
    ],
    defaultLocale: 'es', // Idioma por defecto
    strategy: 'no_prefix', // Estrategia de localización
    vueI18n: './i18n/config.js', // Configuración de Vue I18n
  },// ← Se agregó la coma que faltaba aquí
  experimental: {
    renderJsonPayloads: false,
  },
  nitro: {
    compressPublicAssets: true, // Comprime los assets públicos con Nitro
  },
  runtimeConfig: {
    pokemonTcgApiKey: process.env.NUXT_POKEMON_TCG_API_KEY, // API Key de Pokemon TCG
    public: {
      pokemonTcgApiBase: 'https://api.pokemontcg.io/v2', // URL de la API de Pokemon TCG
      backendBaseUrl: process.env.NUXT_BACKEND_BASE_URL || 'http://localhost:8000/api', // URL de la API de Django, usa variable de entorno en producción
      youtubeApiKey: process.env.NUXT_YOUTUBE_API_KEY, // API Key de YouTube
    },
  },
});
