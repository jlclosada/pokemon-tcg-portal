<template>
  <nav class="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo con animaciones -->
      <ULink to="/">
        <img
          src="/images/pokeball.png"
          alt="Pokéball Logo"
          class="w-14 h-14 object-contain cursor-pointer transition-all duration-300 transform hover:rotate-180 hover:scale-125"
        />
      </ULink>

      <UButton @click="toggleMenu()" class="block md:hidden">
        <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
      </UButton>

      <div class="hidden md:flex">
        <UHorizontalNavigation :links="horizontalLinks" class="border-b border-gray-200 dark:border-gray-800"/>
      </div>

      <div v-if="isMenuOpen" class="flex flex-col md:hidden absolute top-10 z-10 left-1/2 transform -translate-x-1/2 p-4 items-center">
        <UVerticalNavigation :links="verticalLinks"/>
      </div>

      <div class="flex items-center justify-center gap-2">
        <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
        <UButton v-if="authStore.isAuthenticated" @click="logout">Logout</UButton>
        <UButton v-else @click="login">Login</UButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store'; // Importa el store de autenticación

const authStore = useAuthStore(); // Usa el store de autenticación

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const horizontalLinks = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      { label: "Home", icon: 'i-heroicons-home', to: "/" },
      { label: "Profile", icon: 'i-heroicons-user', to: "/profile" },
      { label: "Collections", icon: 'i-heroicons-circle-stack', to: "/collections" },
      { label: "Favorites", icon: 'i-heroicons-heart', to: "/favorites" },
      { label: "About us", icon: 'i-heroicons-information-circle', to: "/about" }
    ];
  } else {
    return [
      { label: "Home", icon: 'i-heroicons-home', to: "/" },
      { label: "About us", icon: 'i-heroicons-information-circle', to: "/about" },
      { label: "Login", icon: 'i-heroicons-arrow-right-start-on-rectangle', to: "/login" }
    ];
  }
});

const verticalLinks = computed(() => {
  return horizontalLinks.value;
});

const login = () => {
  navigateTo('/login'); // Redirige al usuario a la página de login
};

const logout = () => {
  authStore.logout(); // Cierra la sesión usando el store
  navigateTo('/'); // Redirige al usuario a la página de inicio
};
</script>