export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  console.log("🔍 API Client configurado con baseURL:", config.public.pokemonTcgApiBase);

  const apiClient = $fetch.create({
    baseURL: config.public.pokemonTcgApiBase,
    headers: {
      'X-Api-Key': config.pokemonTcgApiKey,
    },
  });

  return {
    provide: {
      apiClient,
    },
  }
});
