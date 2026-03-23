<template>
  <footer class="w-full border-t border-white/5 bg-gray-950/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-6 py-14">
      <!-- Grid principal -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Columna 1: Marca -->
        <div class="flex flex-col gap-4">
          <NuxtLink to="/" class="flex items-center gap-2.5 group">
            <img src="/images/pokeball.png" alt="Pokéball"
              class="w-9 h-9 transition-transform duration-500 group-hover:rotate-[360deg]" />
            <span class="text-white/90 font-extrabold text-xl tracking-tight">TCG Portal</span>
          </NuxtLink>
          <p class="text-sm text-white/30 leading-relaxed">
            Tu plataforma para explorar la Pokédex, coleccionar cartas del TCG y descubrir contenido del mundo Pokémon.
          </p>
          <span class="text-xs text-yellow-400/40 italic">Gotta catch 'em all! ⚡</span>
        </div>

        <!-- Columna 2: Navegación -->
        <div>
          <h4 class="text-white/60 font-bold text-xs uppercase tracking-wider mb-4">Explorar</h4>
          <ul class="space-y-2.5">
            <li><NuxtLink to="/" class="footer-link">Inicio</NuxtLink></li>
            <li><NuxtLink to="/pokedex" class="footer-link">Pokédex</NuxtLink></li>
            <li><NuxtLink to="/cards" class="footer-link">Cartas TCG</NuxtLink></li>
            <li><NuxtLink to="/media" class="footer-link">Multimedia</NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link">Sobre nosotros</NuxtLink></li>
          </ul>
        </div>

        <!-- Columna 3: Recursos -->
        <div>
          <h4 class="text-white/60 font-bold text-xs uppercase tracking-wider mb-4">Recursos</h4>
          <ul class="space-y-2.5">
            <li><a href="https://pokemontcg.io/" target="_blank" rel="noopener" class="footer-link">Pokémon TCG API</a></li>
            <li><a href="https://pokeapi.co/" target="_blank" rel="noopener" class="footer-link">PokéAPI</a></li>
            <li><a href="https://www.pokemon.com/es" target="_blank" rel="noopener" class="footer-link">Pokémon.com</a></li>
            <li><NuxtLink to="/maintenance" class="footer-link">Política de privacidad</NuxtLink></li>
            <li><NuxtLink to="/maintenance" class="footer-link">Términos de servicio</NuxtLink></li>
          </ul>
        </div>

        <!-- Columna 4: Redes -->
        <div>
          <h4 class="text-white/60 font-bold text-xs uppercase tracking-wider mb-4">Comunidad</h4>
          <p class="text-sm text-white/25 mb-4">Síguenos para estar al día.</p>
          <div class="flex gap-3">
            <a v-for="social in socialLinks" :key="social.label"
              :href="social.href" target="_blank" rel="noopener noreferrer" :title="social.label"
              class="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-yellow-400/40 hover:bg-yellow-400/5 transition-all duration-300 group">
              <svg class="w-5 h-5 text-white/30 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" v-html="social.svg" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-white/20">
          © {{ new Date().getFullYear() }} José Luis Cáceres Losada · Todos los derechos reservados
        </p>
        <p class="text-xs text-white/15">
          No afiliado a The Pokémon Company International · <a href="https://pokemontcg.io/" target="_blank" class="text-yellow-400/30 hover:text-yellow-400/60 transition-colors">pokemontcg.io</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', svg: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" stroke-linecap="round" stroke-linejoin="round"/>' },
  { label: 'Instagram', href: 'https://instagram.com', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { label: 'YouTube', href: 'https://youtube.com', svg: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" stroke-linecap="round" stroke-linejoin="round"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>' },
  { label: 'Discord', href: 'https://discord.com', svg: '<path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28A19.5 19.5 0 0 0 3.68 4.37 20.09 20.09 0 0 0 .1 16.91a19.9 19.9 0 0 0 6.07 3.03 14.09 14.09 0 0 0 1.27-2.04c-.7-.26-1.37-.58-2-.95.17-.12.33-.25.49-.37a14.21 14.21 0 0 0 12.14 0c.16.13.32.25.49.37-.64.37-1.31.69-2 .95a14.09 14.09 0 0 0 1.27 2.04 19.87 19.87 0 0 0 6.07-3.03A20.09 20.09 0 0 0 20.32 4.37zM8.02 14.32c-1.18 0-2.16-1.07-2.16-2.38s.95-2.38 2.16-2.38 2.18 1.07 2.16 2.38c0 1.31-.96 2.38-2.16 2.38zm7.96 0c-1.18 0-2.16-1.07-2.16-2.38s.95-2.38 2.16-2.38 2.18 1.07 2.16 2.38c0 1.31-.95 2.38-2.16 2.38z" stroke-linecap="round" stroke-linejoin="round"/>' },
];
</script>

<style scoped>
.footer-link {
  @apply text-sm text-white/25 hover:text-yellow-400/80 transition-colors duration-200;
}
</style>
