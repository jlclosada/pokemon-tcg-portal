<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form @submit.prevent="handleRegister" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Register</h2>
  
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="userData.email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
  
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            v-model="userData.username"
            type="text"
            id="username"
            placeholder="Enter your username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <!-- Firstname -->
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              v-model="userData.name"
              type="text"
              id="name"
              placeholder="Enter your name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

        <!-- Lastname -->
        <div class="mb-4">
            <label for="lastname" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lastname</label>
            <input
              v-model="userData.lastname"
              type="text"
              id="name"
              placeholder="Enter your lastname"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
  
        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="userData.password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
  
        <!-- Confirm Password -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            v-model="userData.confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
  
        <!-- Date of Birth -->
        <div class="mb-6">
          <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
          <input
            v-model="userData.dateOfBirth"
            type="date"
            id="dateOfBirth"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
  
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-all"
        >
          Register
        </button>
  
        <!-- Error Message -->
        <p v-if="error" class="mt-4 text-sm text-red-500 dark:text-red-400">{{ error }}</p>
  
        <!-- Login Link -->
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <a href="/login" class="text-yellow-400 hover:text-yellow-500">Login here</a>
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
  import WelcomeModal from '~/components/WelcomeModal.vue'; // Importa el componente del modal
  
  const { $axios } = useNuxtApp(); // Obtén la instancia de Axios
  const authStore = useAuthStore(); // Usa el store de autenticación
  
  const userData = ref({
    email: '',
    username: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '', // Usamos un string para el input de tipo date
  });
  
  const error = ref('');
  const showWelcomeModal = ref(false); // Controla la visibilidad del modal
  
  const handleRegister = async () => {
    try {
      // Verifica que las contraseñas coincidan
      if (userData.value.password !== userData.value.confirmPassword) {
        error.value = 'Passwords do not match.';
        return;
      }
  
      // Envía los datos al backend
      const response = await $axios.post('/users/register/', {
        email: userData.value.email,
        username: userData.value.username,
        first_name: userData.value.name,
        last_name: userData.value.lastname,
        password: userData.value.password,
        date_of_birth: userData.value.dateOfBirth, // Envía la fecha directamente
      });
  
      // Inicia sesión automáticamente
      const loginResponse = await $axios.post('/users/login/', {
        username: userData.value.username,
        password: userData.value.password,
      });
  
      // Actualiza el estado de autenticación
      authStore.login(loginResponse.data.access, loginResponse.data.user);
      navigateTo('/'); // Redirige al usuario a la página de inicio
  
      // Muestra el modal de bienvenida
      showWelcomeModal.value = true;
    } catch (err) {
      error.value = 'Registration failed. Please try again.';
      console.error('Registration failed:', err);
    }
  };
  </script>