<template>
  <nav class="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/30 dark:border-gray-700/30 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">

      <!-- Logo -->
      <ULink to="/" class="flex-shrink-0">
        <img src="/images/pokeball.png" alt="Pokéball Logo"
          class="w-12 h-12 object-contain cursor-pointer transition-transform duration-300 hover:scale-110" />
      </ULink>

      <!-- Enlaces centrados en pantallas grandes -->
      <div class="hidden md:flex items-center gap-4 mx-auto flex-1 justify-center">
        <ULink v-for="link in horizontalLinks" :key="link.to" :to="link.to"
          :class="{ 'text-blue-500 font-semibold': isActive(link.to) }"
          class="px-3 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <span class="flex items-center gap-1.5">
            <img v-if="link.iconType === 'image'" :src="link.icon" class="w-5 h-5 dark:filter dark:invert" alt="Icon" />
            <UIcon v-else :name="link.icon" class="w-5 h-5" />
            {{ link.label }}
          </span>
        </ULink>
      </div>

      <!-- Controles a la derecha -->
      <div class="flex items-center gap-3">
        <!-- Botón de menú hamburguesa (solo en móviles) -->
        <button @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          <UIcon name="i-heroicons-bars-3" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <!-- Modo oscuro -->
        <UToggle v-model="isDark" class="rounded-full border border-gray-200 dark:border-gray-700"
          on-icon="i-heroicons-moon-20-solid" off-icon="i-heroicons-sun-20-solid" size="lg" />


        <!-- Dropdown de idioma -->
        <div class="relative">
          <button @click="toggleDropdown"
            class="flex items-center gap-1 p-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
            <img :src="selectedLanguage.flag" class="w-4 h-4" alt="flag" />
            <Icon name="i-heroicons-chevron-down" class="w-3 h-3 text-gray-500 dark:text-gray-300" />
          </button>

          <div v-if="isDropdownOpen"
            class="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-800 border rounded-md shadow-lg overflow-hidden">
            <ul class="py-1 text-sm">
              <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)"
                class="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{ 'font-semibold': lang.code === locale }">
                <img :src="lang.flag" class="w-4 h-4" alt="flag" />
                <span>{{ lang.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Menú lateral en móviles -->
  <transition name="slide">
    <div v-if="isMenuOpen" class="fixed inset-0 bg-black/50 z-50" @click="isMenuOpen = false"></div>
  </transition>

  <transition name="slide">
    <div v-if="isMenuOpen" class="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-50 p-4 flex flex-col">
      <!-- Botón para cerrar -->
      <button @click="isMenuOpen = false"
        class="self-end p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
        <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      <!-- Enlaces del menú -->
      <nav class="flex flex-col gap-3 mt-4">
        <ULink v-for="link in horizontalLinks" :key="link.to" :to="link.to"
          @click="isMenuOpen = false"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <img v-if="link.iconType === 'image'" :src="link.icon" class="w-6 h-6 dark:filter dark:invert" alt="Icon" />
          <UIcon v-else :name="link.icon" class="w-6 h-6" />
          {{ link.label }}
        </ULink>
      </nav>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth.store';
import { useI18n, useCookie } from '#imports';

const { locale, t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
});

const languages = [
  { code: 'es', name: 'ES', flag: '/icons/es.svg' },
  { code: 'en', name: 'EN', flag: '/icons/en.svg' }
];

const langCookie = useCookie('lang');

if (langCookie.value) {
  locale.value = langCookie.value;
}

watch(locale, (newLocale) => {
  langCookie.value = newLocale;
});

const selectedLanguage = computed(() => languages.find(lang => lang.code === locale.value) || languages[0]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeLanguage = (langCode: string) => {
  locale.value = langCode;
  langCookie.value = langCode;
  isDropdownOpen.value = false;
};

// Cerrar dropdown al hacer click fuera
const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  authStore.checkAuth();
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const isActive = (path: string) => route.path === path;

const horizontalLinks = computed(() => authStore.isAuthenticated ? [
  { label: t("home"), icon: 'i-heroicons-home', iconType: 'icon', to: "/" },
  { label: t("pokedex"), icon: '/icons/pokedex.svg', iconType: 'image', to: "/pokedex" },
  { label: t("card_explorer"), icon: '/icons/card.png', iconType: 'image', to: "/cards" },
  { label: t("media"), icon: 'i-heroicons-play', iconType: 'icon', to: "/media" },
  { label: t("about_us"), icon: 'i-heroicons-information-circle', iconType: 'icon', to: "/about" }
] : [
  { label: t("home"), icon: 'i-heroicons-home', iconType: 'icon', to: "/" },
  { label: t("pokedex"), icon: '/icons/pokedex.svg', iconType: 'image', to: "/pokedex" },
  { label: t("card_explorer"), icon: '/icons/card.png', iconType: 'image', to: "/cards" },
  { label: t("media"), icon: 'i-heroicons-play', iconType: 'icon', to: "/media" },
  { label: t("about_us"), icon: 'i-heroicons-information-circle', iconType: 'icon', to: "/about" }
]);

const login = () => router.push('/login');
const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
