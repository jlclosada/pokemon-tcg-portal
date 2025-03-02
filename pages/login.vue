<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form @submit.prevent="handleLogin" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            v-model="credentials.username"
            type="text"
            id="username"
            placeholder="Enter your username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-all"
        >
          Login
        </button>
        <p v-if="error" class="mt-4 text-sm text-red-500 dark:text-red-400">{{ error }}</p>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <a href="/register" class="text-yellow-400 hover:text-yellow-500">Register here</a>
        </p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useNuxtApp } from '#app'; // Importa useNuxtApp
  import { useAuthStore } from '~/stores/auth.store'; // Importa el store de autenticación
  
  const { $axios } = useNuxtApp(); // Obtén la instancia de Axios
  const authStore = useAuthStore(); // Usa el store de autenticación
  
  const credentials = ref({
    username: '',
    password: '',
  });
  
  const error = ref('');
  
  const handleLogin = async () => {
    try {
      const response = await $axios.post('/users/login/', credentials.value); // Usa $axios
      authStore.login(response.data.access, response.data.user); // Actualiza el estado de autenticación
      navigateTo('/'); // Redirige al usuario a la página de inicio
    } catch (err) {
      error.value = 'Invalid username or password. Please try again.';
      console.error('Login failed:', err);
    }
  };
  </script>