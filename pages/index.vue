<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <!-- Video de fondo -->
    <div class="video-background">
      <video autoplay loop muted class="video" src="/videos/pokemon_intro.mp4"></video>
    </div>

    <!-- Sección de Bienvenida -->
    <section class="relative w-full h-screen flex flex-col items-center justify-center text-center p-8 z-10">
      <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white animate-fade-in text-shadow-lg">
        ¡Bienvenido al Mundo Pokémon!
      </h1>
      <p class="mt-4 text-lg text-white-900 dark:text-white-900 animate-fade-in delay-200 text-shadow-md">
        Explora la Pokédex, colecciona cartas, compite y descubre todo sobre Pokémon.
      </p>
      <ULink to="/pokedex" class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-300 to-purple-700 text-white font-semibold rounded-lg hover:scale-110 transition-transform shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-500 hover:shadow-blue-500 hover:bg-blue-600 hover:ring-4 hover:ring-blue-500">
        Explorar Pokédex
      </ULink>
    </section>

    <!-- Sección de Novedades -->
    <section class="bg-gray-100 dark:bg-gray-800 py-16">
      <!-- Sección de Categorías -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-8">
        <!-- Usar imágenes para Pokédex y Cartas -->
        <CategoryCard title="Pokédex" description="Consulta información detallada de cada Pokémon." iconType="image" icon="/icons/pokedex.svg" link="/pokedex"/>
        <CategoryCard title="Cartas" description="Colecciona y analiza cartas del TCG." iconType="image" icon="/icons/card.png" link="/cards"/>

        <!-- Usar iconos de Heroicons para las otras categorías -->
        <CategoryCard title="Competitivo" description="Aprende estrategias y mejora tus habilidades." iconType="icon" iconName="sparkles" link="/maintenance"/>
        <CategoryCard title="Multimedia" description="Descubre series, películas y más contenido." iconType="icon" iconName="tv" link="/maintenance"/>
        <CategoryCard title="Guías" description="Encuentra consejos y tutoriales para entrenadores." iconType="icon" iconName="book-open" link="/maintenance"/>
      </section>
      <div class="max-w-7xl mx-auto text-center mt-8">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Últimas Novedades</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Mantente informado sobre los eventos más recientes en el mundo Pokémon.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
/* Estilo para el video de fondo */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* El video estará en el fondo */
  overflow: hidden;
  height: 100vh; /* Ajuste dinámico en relación al tamaño de la pantalla */
  width: 100vw;  /* Se ajusta al ancho de la pantalla */
}

.video {
  object-fit: cover; /* Asegura que el video cubra toda la pantalla */
  width: 100%;       /* El video ocupa el 100% del ancho */
  height: 100%;      /* El video ocupa el 100% de la altura */
  object-position: center; /* Centra el video */
}

/* Asegurar que el contenido dentro del video no se desborde en dispositivos pequeños */
@media (max-width: 640px) {
  .video-background {
    height: 80vh; /* Reducir la altura del video en pantallas pequeñas */
  }
}

/* Animación de desvanecimiento */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

/* Efectos de sombra y profundidad */
.text-shadow-lg {
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5);
}

.text-shadow-md {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

.shadow-lg {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.1);
}

/* Efectos hover modernos y brillantes para el botón */
.hover\:scale-110:hover {
  transform: scale(1.1);
}

.transition-transform {
  transition: transform 0.3s ease;
}

.border-transparent {
  border: 1px solid;
}

.hover\:border-blue-500:hover {
  border-color: #e8ebf0; /* Azul Pokémon */
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 0 15px rgb(2, 2, 2);
}

.hover\:shadow-blue-500:hover {
  box-shadow: 0 0 15px rgb(239, 240, 241);
}

.hover\:ring-4:hover {
  ring: 4px;
}

.hover\:ring-blue-500:hover {
  ring-color: #dadee4; /* Azul Pokémon */
}

/* Scroll futurista */
body {
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
}

/* Efecto de desplazamiento futurista */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff6a00, #ff6600);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

</style>
