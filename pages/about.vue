<script setup lang="ts">
import { ref, onMounted } from "vue"; // Importar ref y onMounted

// Lista de preguntas y respuestas
const faqs = ref([
  {
    question: "¿Cómo puedo empezar a coleccionar cartas aquí?",
    answer: "Solo necesitas crear una cuenta y empezar a buscar cartas. Puedes añadirlas a tus colecciones y favoritos."
  },
  {
    question: "¿Es gratuito usar la plataforma?",
    answer: "Sí, nuestra plataforma es completamente gratuita para todos los usuarios."
  },
  {
    question: "¿Cómo puedo contribuir al proyecto?",
    answer: "Si deseas contribuir, contáctanos a través de nuestras redes sociales o envíanos un correo electrónico."
  },
  {
    question: "¿Tienen una comunidad?",
    answer: "Sí, puedes unirte a nuestra comunidad en Discord para compartir, discutir estrategias y participar en eventos exclusivos."
  },
  {
    question: "¿Cómo garantizan la autenticidad de las cartas?",
    answer: "Trabajamos con fuentes verificadas y utilizamos un sistema de autenticación para asegurar que las cartas sean legítimas."
  }
]);

// Estado para controlar qué preguntas están abiertas
const openIndexes = ref<Record<number, boolean>>({});

// Función para alternar la visibilidad de la respuesta
const toggleDropdown = (index: number) => {
  openIndexes.value[index] = !openIndexes.value[index];
};

// Animación de aparición progresiva de secciones
const fadeIn = ref(false);

onMounted(() => { // Mostrar las secciones con una animación de fade-in
  setTimeout(() => { // Retrasar la animación para que se vea correctamente
    fadeIn.value = true; // Mostrar las secciones
  }, 300); // Retraso de 300ms
});
</script>

<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
  >
    <div
      class="w-full max-w-5xl px-6 py-16 text-center dark:text-gray-300 transform transition-all duration-1000"
      :class="{'opacity-0 translate-y-10': !fadeIn, 'opacity-100 translate-y-0': fadeIn}"
    >
      <!-- Título principal -->
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent px-4">
        Sobre Nosotros
      </h1>

      <!-- Historia -->
      <section class="mt-12 text-left max-w-3xl mx-auto">
        <h2 class="text-3xl font-semibold text-yellow-400 mb-4">Nuestra Historia</h2>
        <p class="text-lg leading-relaxed">
          Pokémon Card Explorer nació del amor por el TCG de Pokémon. Empezamos como un pequeño grupo de coleccionistas frustrados por la falta de una plataforma moderna para gestionar nuestras cartas.
          Decidimos tomar acción y creamos esta comunidad donde cualquier persona puede organizar su colección con facilidad y conectarse con otros fans.
        </p>
      </section>

      <!-- Características principales -->
      <section class="mt-12">
        <h2 class="text-3xl font-semibold text-yellow-400 mb-4">Características Principales</h2>
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div class="p-6 dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-semibold text-yellow-400">Exploración Avanzada</h3>
            <p>Encuentra cualquier carta con filtros y búsqueda avanzada.</p>
          </div>
          <div class="p-6 dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-semibold text-yellow-400">Gestión de Colección</h3>
            <p>Organiza, etiqueta y visualiza tu colección de manera eficiente.</p>
          </div>
          <div class="p-6 dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-semibold text-yellow-400">Intercambio Seguro</h3>
            <p>Conéctate con otros coleccionistas y haz intercambios fácilmente.</p>
          </div>
        </div>
      </section>

      <!-- Valores -->
      <section class="mt-12">
        <h2 class="text-3xl font-semibold text-yellow-400 mb-4">Nuestros Valores</h2>
        <ul class="list-disc list-inside text-lg">
          <li class="mb-2">Transparencia y confianza</li>
          <li class="mb-2">Pasión por el coleccionismo</li>
          <li class="mb-2">Comunidad y colaboración</li>
        </ul>
      </section>

      <!-- Testimonios -->
      <section class="mt-12">
        <h2 class="text-3xl font-semibold text-yellow-400 mb-4">Lo que dicen nuestros usuarios</h2>
        <div class="space-y-6">
          <div class="p-6 bg-gray-800 rounded-lg shadow-lg">
            <p class="text-lg italic">"La mejor plataforma que he usado para organizar mi colección. Súper intuitiva y fácil de usar." - <span class="font-semibold text-yellow-400">Juan Pérez</span></p>
          </div>
          <div class="p-6 bg-gray-800 rounded-lg shadow-lg">
            <p class="text-lg italic">"Por fin un lugar donde puedo intercambiar cartas sin preocupaciones. ¡Increíble trabajo!" - <span class="font-semibold text-yellow-400">María López</span></p>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="mt-16">
        <h2 class="text-4xl font-bold text-yellow-400 mb-6">Preguntas Frecuentes</h2>
        <div class="space-y-4 text-left max-w-3xl mx-auto">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <button
              @click="toggleDropdown(index)"
              class="w-full text-left text-lg font-semibold text-yellow-400 flex justify-between items-center focus:outline-none"
            >
              {{ faq.question }}
              <span
                :class="{'rotate-180': openIndexes[index]}"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <div
              v-if="openIndexes[index]"
              class="mt-2 text-gray-300 transition-opacity duration-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- Contacto -->
      <section class="mt-12">
        <h2 class="text-3xl font-semibold text-yellow-400 mb-4">Contáctanos</h2>
        <p class="text-lg">Escríbenos a <span class="text-yellow-400 font-semibold">contacto@pokemoncardexplorer.com</span></p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
