<template>
  <nav class="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo con imagen -->
      <ULink to="/">
        <img src="/images/pokeball.png" alt="Pokéball Logo" class="w-10 h-10 object-contain" />
      </ULink>

      <UButton @click="toggleMenu()" class="block md:hidden">
        <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
      </UButton>

      <div class="hidden md:flex">
        <UHorizontalNavigation :links="horizontalLinks"/>
      </div>

      <div v-if="isMenuOpen" class="flex flex-col md:hidden absolute top-10 z-10 left-1/2 transform -translate-x-1/2 p-4 items-center">
        <UVerticalNavigation :links="verticalLinks"/>
      </div>

      <div class="flex items-center justify-center gap-2">
        <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
      </div>
    </div>
  </nav>
</template>



<script setup lang="ts">
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
const horizontalLinks = [
  { label: "Home", icon: 'i-heroicons-home', to: "/" },
  // { label: "About", to: "/about" },
  // { label: "Contact", to: "/contact" },
];
const verticalLinks = [...horizontalLinks];
</script>
