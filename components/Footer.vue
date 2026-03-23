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

        <!-- Redes sociales con SVG inline -->
        <div class="flex flex-col items-center gap-3">
          <div class="flex gap-4">
            <a v-for="social in socialLinks" :key="social.label"
              :href="social.href" target="_blank" rel="noopener noreferrer" :title="social.label"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700/50 hover:border-yellow-400/50 hover:bg-gray-700 transition-all duration-300 group">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" v-html="social.svg" />
            </a>
          </div>
          <p class="text-xs text-gray-500">Síguenos en redes sociales</p>
        </div>

        <!-- Links legales -->
        <div class="flex flex-col items-center md:items-end gap-2">
          <NuxtLink to="/maintenance" class="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
            Política de privacidad
          </NuxtLink>
          <NuxtLink to="/maintenance" class="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
            Términos de servicio
          </NuxtLink>
        </div>
      </div>

      <!-- Copyright con animación sutil y centrado -->
      <div class="flex justify-center mt-12 border-t border-gray-700/30 pt-8 text-center">
        <p class="text-xs text-gray-400/75 animate-pulse-slow">
          © {{ new Date().getFullYear() }} José Luis Cáceres Losada <br>Todos los derechos reservados<br>
          No afiliado a The Pokémon Company International
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', svg: '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>' },
  { label: 'Instagram', href: 'https://instagram.com', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5"/>' },
  { label: 'YouTube', href: 'https://youtube.com', svg: '<path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
];
</script>

<style scoped>
/* Efecto de escala al hacer hover en el logo */
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
