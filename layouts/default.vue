<template>
  <div class="flex flex-col min-h-screen text-white relative z-10">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed, watch } from "vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

if (import.meta.client) {
  watch(isDark, (v) => {
    document.documentElement.classList.toggle("dark", v);
  }, { immediate: true });
}
</script>
