<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
    <form @submit.prevent="handleRegister" class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/images/pokeball.png" alt="Pokéball" class="w-16 h-16" />
      </div>

      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Crear Cuenta</h2>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input v-model="userData.email" type="email" id="email" placeholder="tu@email.com" required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
      </div>

      <!-- Username -->
      <div class="mb-4">
        <label for="reg-username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuario</label>
        <input v-model="userData.username" type="text" id="reg-username" placeholder="Tu nombre de usuario" required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
      </div>

      <!-- Nombre y Apellido en fila -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="reg-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
          <input v-model="userData.name" type="text" id="reg-name" placeholder="Nombre" required
            class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
        </div>
        <div>
          <label for="reg-lastname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
          <input v-model="userData.lastname" type="text" id="reg-lastname" placeholder="Apellido" required
            class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
        </div>
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label for="reg-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
        <input v-model="userData.password" type="password" id="reg-password" placeholder="Mínimo 8 caracteres" required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
      </div>

      <!-- Confirm Password -->
      <div class="mb-4">
        <label for="reg-confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Contraseña</label>
        <input v-model="userData.confirmPassword" type="password" id="reg-confirmPassword" placeholder="Repite la contraseña" required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
      </div>

      <!-- Date of Birth -->
      <div class="mb-6">
        <label for="reg-dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de Nacimiento</label>
        <input v-model="userData.dateOfBirth" type="date" id="reg-dateOfBirth" required
          class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition-all" />
      </div>

      <!-- Submit -->
      <button type="submit" :disabled="isLoading"
        class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Registrando...' : 'Crear Cuenta' }}
      </button>

      <p v-if="error" class="mt-4 text-sm text-red-500 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
        {{ error }}
      </p>

      <p class="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-yellow-500 hover:text-yellow-400 font-semibold">Inicia sesión</NuxtLink>
      </p>
    </form>

    <!-- Modal de bienvenida -->
    <WelcomeModal v-if="showWelcomeModal" @close="showWelcomeModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth.store';
import WelcomeModal from '~/components/WelcomeModal.vue';

const nuxtApp = useNuxtApp() as any;
const axios = nuxtApp.$axios;
const authStore = useAuthStore();

const userData = ref({
  email: '',
  username: '',
  name: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
});

const error = ref('');
const isLoading = ref(false);
const showWelcomeModal = ref(false);

const handleRegister = async () => {
  // Validaciones
  if (userData.value.password !== userData.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden.';
    return;
  }

  if (userData.value.password.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    await axios.post('/users/register/', {
      email: userData.value.email,
      username: userData.value.username,
      first_name: userData.value.name,
      last_name: userData.value.lastname,
      password: userData.value.password,
      date_of_birth: userData.value.dateOfBirth,
    });

    // Login automático
    const loginResponse = await axios.post('/users/login/', {
      username: userData.value.username,
      password: userData.value.password,
    });

    authStore.login(loginResponse.data.access, loginResponse.data.user);
    showWelcomeModal.value = true;

    // Redirigir después de mostrar el modal
    setTimeout(() => {
      navigateTo('/');
    }, 2000);
  } catch (err: any) {
    if (err.response?.data) {
      const data = err.response.data;
      error.value = typeof data === 'string' ? data : Object.values(data).flat().join('. ');
    } else {
      error.value = 'Error al registrarse. Inténtalo de nuevo.';
    }
    console.error('Registration failed:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>
