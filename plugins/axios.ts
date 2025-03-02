import axios from 'axios';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  // Configura Axios con la URL base del backend
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.backendBaseUrl, // Usa la URL base del backend
  });

  // Inyecta Axios en la aplicación Nuxt
  return {
    provide: {
      axios: axiosInstance,
    },
  };
});