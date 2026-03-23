import type { AxiosInstance } from 'axios';

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance;
    $apiClient: typeof $fetch;
    $youtubeApiKey: string;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $apiClient: typeof $fetch;
  }
}

export {};

