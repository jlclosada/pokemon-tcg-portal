<template>
  <div class="main-container">
    <!-- Video de fondo -->
    <div class="video-background">
      <video autoplay loop muted playsinline class="video">
        <source src="/videos/pokemon_bg.mp4" type="video/mp4" />
        Tu navegador no soporta videos en HTML5.
      </video>
    </div>

    <!-- Contenedor desplazable -->
    <div class="content space-y-24">
      <!-- Sección de Bienvenida -->
      <section class="flex flex-col items-center justify-center text-center px-8 py-16 z-10 bg-transparent">
        <h1 class="mt-12 text-5xl md:text-7xl font-bold text-white animate-fade-in text-shadow-lg">
          ¡Bienvenido al Mundo Pokémon!
        </h1>
        <p class="mt-4 text-lg text-white animate-fade-in delay-200 text-shadow-md">
          Explora la Pokédex, colecciona cartas, compite y descubre todo sobre Pokémon.
        </p>
        <ULink
          to="/pokedex"
          class="relative mt-6 px-12 py-4 text-lg font-bold text-white uppercase tracking-widest transition-all duration-300 ease-in-out transform bg-red-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-red-500/50 border border-red-900 overflow-hidden font-lexend"
        >
          <span class="relative z-10">Explorar Pokédex</span>

          <!-- Brillo dinámico -->
          <span class="absolute inset-0 bg-gradient-to-r from-red-300 to-red-900 opacity-70 hover:opacity-20 transition-opacity duration-500"></span>

          <!-- Sombra de energía -->
          <span class="absolute -inset-1 bg-red-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50"></span>
        </ULink>
      </section>
      <!-- Secciones con fondo transparente -->
      <section class="relative w-full py-16 bg-transparent">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
          <CategoryCard title="Pokédex" description="Consulta información detallada de cada Pokémon." iconType="image" icon="/icons/pokedex.svg" link="/pokedex"/>
          <CategoryCard title="Cartas" description="Colecciona y analiza cartas del TCG." iconType="image" icon="/icons/deck.svg" link="/cards"/>
          <CategoryCard title="Competitivo" description="Aprende estrategias y mejora tus habilidades." iconType="icon" iconName="sparkles" link="/maintenance"/>
          <CategoryCard title="Multimedia" description="Descubre series, películas y más contenido." iconType="icon" iconName="tv" link="/maintenance"/>
          <CategoryCard title="Guías" description="Encuentra consejos y tutoriales para entrenadores." iconType="icon" iconName="book-open" link="/maintenance"/>
        </div>
      </section>

      <section class="relative w-full py-16 bg-transparent">
        <div class="max-w-7xl mx-auto text-center px-8">
          <h2 class="text-4xl font-bold text-white mb-8">Últimas Novedades</h2>
          <p class="text-lg text-gray-300 mb-12">
            Mantente informado sobre los eventos más recientes en el mundo Pokémon.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <NewsCard
              v-for="newsItem in newsData"
              :key="newsItem.id"
              :title="newsItem.title"
              :date="newsItem.date"
              :image="newsItem.image"
              :link="`/news/${newsItem.id}`"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script setup lang="ts">
import CategoryCard from "~/components/CategoryCard.vue";
import NewsCard from "~/components/NewsCard.vue";

const newsData = [
  {
    id: '1',
    title: 'Nuevo Set de Cartas TCG',
    date: '20 Feb 2025',
    image: '/images/tcg_set.jpg',
  },
  {
    id: '2',
    title: 'Actualización de la Pokédex',
    date: '18 Feb 2025',
    image: '/images/pokedex_update.jpg',
  },
  {
    id: '3',
    title: 'Campeonato Pokémon Mundial',
    date: '15 Feb 2025',
    image: '/images/competitivo.jpg',
  }
];
</script>

<style scoped>
/* Hace que el video de fondo permanezca fijo */
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Coloca el video en el fondo */
  overflow: hidden;
  pointer-events: none;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Contenedor principal que permite el scroll */
.main-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* Contenedor de contenido que se puede desplazar */
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento vertical */
  padding-bottom: 20px;
}

/* Secciones transparentes */
section {
  position: relative;
  z-index: 10;
  background: transparent;
}

/* Mejor contraste en textos */
.text-shadow-lg {
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7);
}

.text-shadow-md {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}
/* Botón futurista */
.neon-button {
  position: relative;
  display: inline-block;
  padding: 12px 32px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(90deg, rgba(0, 170, 255, 0.8), rgba(128, 0, 255, 0.8));
  border-radius: 8px;
  text-shadow: 0px 0px 10px rgba(0, 255, 255, 0.8);
  box-shadow: 0px 0px 15px rgba(0, 255, 255, 0.5);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border: 2px solid rgba(0, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

/* Efecto hover con luz dinámica */
.neon-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 30px rgba(0, 255, 255, 0.8);
  background: linear-gradient(90deg, rgba(0, 255, 255, 1), rgba(128, 0, 255, 1));
  border-color: rgba(0, 255, 255, 1);
}

/* Efecto de pulso */
.neon-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 300%;
  background: rgba(0, 255, 255, 0.2);
  transition: all 0.6s ease-in-out;
  transform: translate(-50%, -50%) rotate(25deg);
  z-index: 1;
}

/* Hover: se intensifica el reflejo */
.neon-button:hover::before {
  width: 150%;
  height: 400%;
  opacity: 0.8;
}

/* Efecto de luz en los bordes */
.neon-button::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  border-radius: 8px;
  border: 3px solid transparent;
  box-shadow: 0px 0px 15px rgba(0, 255, 255, 0.5);
  animation: glow 1.5s infinite alternate ease-in-out;
}

@keyframes glow {
  0% { opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; }
}

/* Brillo suave */
.animate-glow {
  animation: glow 2s infinite alternate;
}


</style>
