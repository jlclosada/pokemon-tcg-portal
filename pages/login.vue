<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
    <form @submit.prevent="handleLogin" class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/images/pokeball.png" alt="Pokéball" class="w-16 h-16" />
      </div>

      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Iniciar Sesión</h2>

      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuario</label>
        <input
          v-model="credentials.username"
          type="text"
          id="username"
          placeholder="Introduce tu usuario"
          required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
        <input
          v-model="credentials.password"
          type="password"
          id="password"
          placeholder="Introduce tu contraseña"
          required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>

      <p v-if="error" class="mt-4 text-sm text-red-500 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
        {{ error }}
      </p>

      <p class="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-yellow-500 hover:text-yellow-400 font-semibold">Regístrate aquí</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth.store';

const nuxtApp = useNuxtApp() as any;
const axios = nuxtApp.$axios;
const authStore = useAuthStore();

const credentials = ref({
  username: '',
  password: '',
});

const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  if (!credentials.value.username || !credentials.value.password) {
    error.value = 'Por favor, completa todos los campos.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await axios.post('/users/login/', credentials.value);
    authStore.login(response.data.access, response.data.user);
    navigateTo('/');
  } catch (err: any) {
    if (err.response?.status === 401) {
      error.value = 'Usuario o contraseña incorrectos.';
    } else if (err.response?.status >= 500) {
      error.value = 'Error del servidor. Inténtalo más tarde.';
    } else {
      error.value = 'Error al iniciar sesión. Inténtalo de nuevo.';
    }
    console.error('Login failed:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>
