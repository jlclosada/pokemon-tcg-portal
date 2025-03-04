<template>
  <nav class="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/30 dark:border-gray-700/30 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">

      <!-- Logo -->
      <ULink to="/" class="flex-shrink-0">
        <img src="/images/pokeball.png" alt="Pokéball Logo"
          class="w-12 h-12 object-contain cursor-pointer transition-transform duration-300 hover:scale-110" />
      </ULink>

      <!-- Enlaces centrados en pantalla grande -->
      <div class="hidden md:flex items-center gap-4 mx-auto flex-1 justify-center">
        <ULink v-for="link in horizontalLinks" :key="link.to" :to="link.to"
          :class="{ 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400': isActive(link.to) }"
          class="px-3 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
          <span class="relative z-10 flex items-center gap-1.5">
            <img v-if="link.iconType === 'image'" :src="link.icon" class="w-5 h-5 dark:filter dark:invert" alt="Icon" />
            <UIcon v-else :name="link.icon" class="w-5 h-5" />
            {{ link.label }}
          </span>
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </ULink>
      </div>

      <!-- Botón del menú móvil -->
      <UButton @click="toggleMenu()"
        class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors absolute right-16">
        <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'"
          class="w-6 h-6 text-gray-900 dark:text-gray-100" />
      </UButton>

      <!-- Controles (Modo oscuro y Login) alineados a la derecha -->
      <div class="flex items-center gap-3 absolute right-4">
        <UToggle v-model="isDark" class="rounded-full border border-gray-200 dark:border-gray-700"
          on-icon="i-heroicons-moon-20-solid" off-icon="i-heroicons-sun-20-solid" size="lg" />
        <UButton v-if="authStore.isAuthenticated" @click="logout" color="gray" variant="ghost"
          class="inline-flex md:inline-flex" label="Logout" />
        <UButton v-else @click="login" color="gray" variant="solid"
          class="hidden md:inline-flex bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
          label="Login" />
      </div>

      <!-- Menú móvil -->
      <div v-if="isMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-700/30">
        <ul class="p-4 space-y-2">
          <li v-for="link in verticalLinks" :key="link.to">
            <ULink :to="link.to" class="flex items-center gap-2 p-3 rounded-lg transition-colors"
              :class="{
                'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400': isActive(link.to),
                'hover:bg-gray-100 dark:hover:bg-gray-800': !isActive(link.to)
              }">
              <img v-if="link.iconType === 'image'" :src="link.icon" class="w-6 h-6 dark:filter dark:invert" alt="Icon" />
              <UIcon v-else :name="link.icon" class="w-6 h-6" />
              <span>{{ link.label }}</span>
            </ULink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const isActive = (path: string) => route.path === path;

// Links en la barra de navegación
const horizontalLinks = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      { label: "Home", icon: 'i-heroicons-home', iconType: 'icon', to: "/" },
      { label: "Pokedex", icon: '/icons/pokedex.svg', iconType: 'image', to: "/pokedex" }, // Nuevo enlace
      { label: "Profile", icon: 'i-heroicons-user', iconType: 'icon', to: "/profile" },
      { label: "Collections", icon: 'i-heroicons-circle-stack', iconType: 'icon', to: "/collections" },
      { label: "Favorites", icon: 'i-heroicons-heart', iconType: 'icon', to: "/favorites" },
      { label: "About us", icon: 'i-heroicons-information-circle', iconType: 'icon', to: "/about" }
    ];
  } else {
    return [
      { label: "Home", icon: 'i-heroicons-home', iconType: 'icon', to: "/" },
      { label: "Pokedex", icon: '/icons/pokedex.svg', iconType: 'image', to: "/pokedex" }, // Nuevo enlace
      { label: "About us", icon: 'i-heroicons-information-circle', iconType: 'icon', to: "/about" },
    ];
  }
});

// Links en el menú móvil
const verticalLinks = computed(() => {
  const links = horizontalLinks.value.slice(); // Copia el array sin modificar el original
  if (!authStore.isAuthenticated) {
    links.push({ label: "Login", icon: "i-heroicons-arrow-long-right", iconType: 'icon', to: "/login" });
  }
  return links;
});

const login = () => router.push('/login');
const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>


<style scoped>
/* Animación del menú móvil */
.U_Slideover-enter-active,
.U_Slideover-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.U_Slideover-enter-from,
.U_Slideover-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
