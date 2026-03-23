export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const API_KEY = config.public.youtubeApiKey;

    return {
      provide: {
        youtubeApiKey: API_KEY,
      },
    };
  });
  