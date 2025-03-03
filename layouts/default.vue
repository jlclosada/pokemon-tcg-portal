<template>
  <div :class="{ dark: isDark }" class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <!-- Navbar con efecto vidrio -->
    <Navbar class="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/30 dark:border-gray-700/30" />

    <div class="flex flex-1 mt-16"> <!-- Añadido margen superior para el navbar -->
      <!-- Sidebar (opcional) -->
      <!-- <Sidebar class="hidden md:block w-64 p-6 bg-gray-50/50 dark:bg-gray-800/30 border-r border-gray-200/30 dark:border-gray-700/30" /> -->

      <!-- Contenido principal con efecto de profundidad -->
      <main class="flex-1">
        <div class="space-y-8 animate-fade-in">
          <slot />
        </div>
      </main>
    </div>

    <!-- Footer mejorado -->
    <Footer class="mt-auto border-t border-gray-200/30 dark:border-gray-700/30" />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";
import Navbar from "~/components/Navbar.vue";
import Sidebar from "~/components/Sidebar.vue";
import Footer from "~/components/Footer.vue";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  },
});

import { watch } from "vue";

watch(isDark, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-to-br {
  background-image:
    linear-gradient(
      to bottom right,
      rgba(249, 250, 251, 0.8) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(249, 250, 251, 0.8) 100%
    );
}

.dark .bg-gradient-to-br {
  background-image:
    linear-gradient(
      to bottom right,
      rgba(17, 24, 39, 0.9) 0%,
      rgba(31, 41, 55, 1) 50%,
      rgba(17, 24, 39, 0.9) 100%
    );
}
</style>
