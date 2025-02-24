<template>
  <div class="flex flex-col min-h-screen">
    <!-- Sección de bienvenida -->
    <GeneralCardSearch />
    <HomeScreen />

    <!-- Sección de características -->
    <section class="py-16 bg-gray-900 text-white text-center">
      <h2 class="text-3xl font-bold mb-6">¿Por qué usar Pokémon Card Explorer?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="p-6 bg-gray-800 rounded-lg shadow">
          <LucideSearch class="w-10 h-10 mx-auto text-yellow-400" />
          <h3 class="text-xl font-semibold mt-4">Búsqueda Avanzada</h3>
          <p class="opacity-80 mt-2">Filtra cartas por nombre, rareza y número.</p>
        </div>
        <div class="p-6 bg-gray-800 rounded-lg shadow">
          <LucideBookOpen class="w-10 h-10 mx-auto text-yellow-400" />
          <h3 class="text-xl font-semibold mt-4">Colecciones Completas</h3>
          <p class="opacity-80 mt-2">Explora todas las colecciones de TCG.</p>
        </div>
        <div class="p-6 bg-gray-800 rounded-lg shadow">
          <LucideStar class="w-10 h-10 mx-auto text-yellow-400" />
          <h3 class="text-xl font-semibold mt-4">Favoritos</h3>
          <p class="opacity-80 mt-2">Guarda tus cartas preferidas en una lista.</p>
        </div>
      </div>
    </section>

    <!-- Sección de imágenes destacadas -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800 text-center">
      <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Cartas Destacadas</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <img v-for="n in 4" :key="n" :src="`/images/highlighted-${n}.jpg`" class="w-full rounded-lg shadow-lg" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HomeScreen from "@/components/HomeScreen.vue";
import Footer from "@/components/Footer.vue";
import { LucideSearch, LucideBookOpen, LucideStar, LucideTwitter, LucideFacebook, LucideInstagram } from "lucide-vue-next";
</script>
