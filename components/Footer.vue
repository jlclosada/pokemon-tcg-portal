<template>
  <footer class="w-full bg-gray-900 text-white text-center py-6">
    <p class="opacity-75">&copy; 2025 Pokémon Card Explorer - Todos los derechos reservados.</p>
    <div class="flex justify-center gap-4 mt-2">
      <a href="#" class="hover:text-yellow-400"><LucideTwitter class="w-5 h-5" /></a>
      <a href="#" class="hover:text-yellow-400"><LucideFacebook class="w-5 h-5" /></a>
      <a href="#" class="hover:text-yellow-400"><LucideInstagram class="w-5 h-5" /></a>
    </div>
    <div>
      <img src="/images/pokeball.png" alt="Pokéball" class="w-8 h-8 mx-auto mt-4 animate-spin" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { LucideTwitter, LucideFacebook, LucideInstagram } from "lucide-vue-next";
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform:rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 3s ease infinite;
}
</style>
