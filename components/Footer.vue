<template>
  <footer class="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <!-- Logo y animación -->
        <div class="flex flex-col items-center md:items-start space-y-4">
          <img src="/images/pokeball.png" alt="Pokéball"
            class="w-12 h-12 hover:scale-110 transform transition-all duration-300" />
          <span class="text-sm font-semibold text-yellow-400/80">Gotta catch 'em all!</span>
        </div>

        <!-- Redes sociales mejoradas -->
        <div class="flex flex-col items-center space-y-4">
          <div class="flex space-x-6">
            <a href="#" class="p-2 rounded-full bg-gray-700/30 hover:bg-yellow-400/20 transition-all duration-300 group"
              v-for="(social, index) in socialLinks" :key="index">
              <component :is="social.icon"
                class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          <p class="text-xs text-gray-400/75">Síguenos en redes sociales</p>
        </div>

        <!-- Derechos de autor con efecto -->
        <div class="flex flex-col items-center md:items-end space-y-2">
          <p @click="goToMaintenance"
            class="text-sm text-gray-300/90 font-medium hover:text-yellow-400 transition-colors cursor-pointer">
            Política de privacidad
          </p>
          <p @click="goToMaintenance"
            class="text-sm text-gray-300/90 font-medium hover:text-yellow-400 transition-colors cursor-pointer">
            Términos de servicio
          </p>
        </div>

        <!-- Copyright con animación sutil -->
        <div class="mt-12 border-t border-gray-700/30 pt-8 text-center">
          <p class="text-xs text-gray-400/75 animate-pulse-slow">
            © 2025 José Luis Cáceres Losada <br>Todos los derechos reservados<br>
            No afiliado a The Pokémon Company International
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { LucideTwitter, LucideFacebook, LucideInstagram, LucideYoutube } from "lucide-vue-next";
import { useRouter } from "vue-router";

const socialLinks = [
  { icon: LucideTwitter, href: '/maintenance' },
  { icon: LucideFacebook, href: '/maintenance' },
  { icon: LucideInstagram, href: '/maintenance' },
  { icon: LucideYoutube, href: '#' }
];
const router = useRouter();

const goToMaintenance = () => {
  router.push("/maintenance");
};
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right,
      #1a1a1a 0%,
      #2d2d2d 50%,
      #1a1a1a 100%);
}
</style>
