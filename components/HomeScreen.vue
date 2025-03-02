<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Efecto de partículas de fondo -->
    <div class="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent opacity-20 animate-pulse-slow" />

    <!-- Contenido principal -->
    <div class="w-full px-4 py-12 flex flex-col items-center">
      <!-- Pokéball animada -->
      <div class="relative group mb-12">
        <div class="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <img 
          src="/images/pokeball.png" 
          alt="Pokéball" 
          class="w-32 h-32 transition-transform duration-500 group-hover:rotate-[360deg] animate-float"
        />
      </div>

      <!-- Título -->
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent px-4">
        Pokémon Card Explorer
      </h1>

      <!-- Subtítulo -->
      <p class="text-xl md:text-2xl text-gray-300 text-center max-w-2xl px-6 mb-12 leading-relaxed">
        Explora, colecciona y descubre todas las cartas del <span class="font-semibold text-yellow-400">Pokémon Trading Card Game</span>
      </p>

      <!-- Botones -->
      <div class="flex flex-col items-center gap-4 z-10">
        <button
          v-if="!showGrid"
          @click="showCollections"
          class="relative overflow-hidden group px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl cursor-pointer"
        >
          <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity" />
          <div class="flex items-center gap-3 text-gray-900">
            <Search class="w-6 h-6 transition-transform group-hover:rotate-12" />
            <span>Explorar Colecciones</span>
          </div>
        </button>

        <button
          v-else
          @click="closeCollections"
          class="px-6 py-3 text-gray-300 hover:text-white border-2 border-gray-700 hover:border-yellow-400 rounded-xl transition-all duration-300 group cursor-pointer active:scale-95"
        >
          <div class="flex items-center gap-2">
            <X class="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>Cerrar Colecciones</span>
          </div>
        </button>
      </div>

      <!-- Grid de colecciones -->
      <Transition name="fade-slide" mode="out-in">
        <CollectionsGrid v-if="showGrid" class="mt-16 w-full px-4" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CollectionsGrid from "@/components/CollectionsGrid.vue";
import { Search, X } from "lucide-vue-next";

const showGrid = ref(false);

const showCollections = () => {
  showGrid.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeCollections = () => {
  showGrid.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Asegurar ancho completo */
.w-full {
  width: 100% !important;
}
</style>