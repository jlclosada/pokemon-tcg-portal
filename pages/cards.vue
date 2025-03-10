<template>
  <div class="flex flex-col min-h-screen">
    <!-- Sección de bienvenida -->
    <!--<GeneralCardSearch /> -->
    <HomeScreen />
    <!-- Sección de imágenes destacadas -->
    <BestCards />
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
  </div>
</template>

<script setup>
import { LucideBookOpen, LucideSearch, LucideStar } from "lucide-vue-next"; // Importamos los iconos de Lucide
import HomeScreen from "~/components/HomeCards.vue"; // Importamos el componente HomeScreen
</script>
