<template>
  <div :class="{ dark: isDark }">
    <!-- Navbar fijo arriba -->
    <Navbar class="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md" />

    <div class="flex">
      <!-- Sidebar ajustado para no solaparse con el Navbar -->
      <Sidebar class="hidden md:block mt-16" />

      <!-- Contenido principal con espacio superior para el Navbar -->
      <main class="flex-1 p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen ml-64 pt-16">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";
import Navbar from "~/components/Navbar.vue";
import Sidebar from "~/components/Sidebar.vue";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
