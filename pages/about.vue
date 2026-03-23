<script setup lang="ts">
import { ref, onMounted } from "vue";

const faqs = ref([
  { question: "¿Cómo puedo empezar a coleccionar cartas aquí?", answer: "Solo necesitas crear una cuenta y empezar a buscar cartas. Puedes añadirlas a tus colecciones y favoritos." },
  { question: "¿Es gratuito usar la plataforma?", answer: "Sí, nuestra plataforma es completamente gratuita para todos los usuarios." },
  { question: "¿Cómo puedo contribuir al proyecto?", answer: "Si deseas contribuir, contáctanos a través de nuestras redes sociales o envíanos un correo electrónico." },
  { question: "¿Tienen una comunidad?", answer: "Sí, puedes unirte a nuestra comunidad en Discord para compartir, discutir estrategias y participar en eventos exclusivos." },
  { question: "¿Cómo garantizan la autenticidad de las cartas?", answer: "Trabajamos con fuentes verificadas y utilizamos un sistema de autenticación para asegurar que las cartas sean legítimas." },
]);

const openIndexes = ref<Record<number, boolean>>({});
const toggleDropdown = (index: number) => { openIndexes.value[index] = !openIndexes.value[index]; };

const fadeIn = ref(false);
onMounted(() => setTimeout(() => (fadeIn.value = true), 200));

const features = [
  { title: "Exploración Avanzada", desc: "Encuentra cualquier carta con filtros y búsqueda avanzada.", emoji: "🔍" },
  { title: "Gestión de Colección", desc: "Organiza, etiqueta y visualiza tu colección de manera eficiente.", emoji: "📦" },
  { title: "Intercambio Seguro", desc: "Conéctate con otros coleccionistas y haz intercambios fácilmente.", emoji: "🤝" },
];

const values = [
  { text: "Transparencia y confianza", emoji: "✨" },
  { text: "Pasión por el coleccionismo", emoji: "❤️" },
  { text: "Comunidad y colaboración", emoji: "🌍" },
];

const testimonials = [
  { text: "La mejor plataforma que he usado para organizar mi colección. Súper intuitiva y fácil de usar.", author: "Juan Pérez" },
  { text: "Por fin un lugar donde puedo intercambiar cartas sin preocupaciones. ¡Increíble trabajo!", author: "María López" },
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div
      class="max-w-5xl mx-auto px-6 py-20 text-gray-800 dark:text-gray-300 transition-all duration-1000"
      :class="{ 'opacity-0 translate-y-10': !fadeIn, 'opacity-100 translate-y-0': fadeIn }"
    >
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-extrabold text-pokemon-gradient mb-4">Sobre Nosotros</h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Conoce la historia detrás de Pokémon Card Explorer y únete a nuestra comunidad
        </p>
      </div>

      <!-- Historia -->
      <section class="mb-16 text-left max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-4 flex items-center gap-2">📖 Nuestra Historia</h2>
        <p class="text-lg leading-relaxed">
          Pokémon Card Explorer nació del amor por el TCG de Pokémon. Empezamos como un pequeño grupo de coleccionistas
          frustrados por la falta de una plataforma moderna para gestionar nuestras cartas.
          Decidimos tomar acción y creamos esta comunidad donde cualquier persona puede organizar su colección con facilidad
          y conectarse con otros fans.
        </p>
      </section>

      <!-- Características -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-8 text-center">⚡ Características Principales</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="f in features" :key="f.title"
            class="p-6 bg-gray-100 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/40 shadow-sm hover:shadow-lg hover:scale-[1.03] hover:border-yellow-400/40 transition-all duration-300 text-center">
            <span class="text-4xl mb-3 block">{{ f.emoji }}</span>
            <h3 class="text-lg font-bold text-yellow-500 dark:text-yellow-400 mb-2">{{ f.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Valores -->
      <section class="mb-16 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-6 text-center">🎯 Nuestros Valores</h2>
        <div class="space-y-3">
          <div v-for="v in values" :key="v.text"
            class="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700/30">
            <span class="text-2xl">{{ v.emoji }}</span>
            <span class="text-lg font-medium">{{ v.text }}</span>
          </div>
        </div>
      </section>

      <!-- Testimonios -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-8 text-center">💬 Lo que dicen nuestros usuarios</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="t in testimonials" :key="t.author"
            class="p-6 bg-gray-100 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/40 shadow-sm">
            <p class="text-lg italic leading-relaxed mb-3">"{{ t.text }}"</p>
            <p class="text-yellow-500 dark:text-yellow-400 font-bold text-sm">— {{ t.author }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-8 text-center">❓ Preguntas Frecuentes</h2>
        <div class="space-y-3 max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index"
            class="bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/40 overflow-hidden">
            <button @click="toggleDropdown(index)"
              class="w-full text-left p-5 font-semibold text-gray-800 dark:text-yellow-400 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
              <span>{{ faq.question }}</span>
              <span :class="{ 'rotate-180': openIndexes[index] }" class="transition-transform duration-300 text-gray-500">▼</span>
            </button>
            <Transition name="faq">
              <div v-if="openIndexes[index]" class="px-5 pb-5 text-gray-600 dark:text-gray-300">
                {{ faq.answer }}
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Contacto -->
      <section class="text-center">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-4">📧 Contáctanos</h2>
        <p class="text-lg">
          Escríbenos a
          <a href="mailto:contacto@pokemoncardexplorer.com" class="text-yellow-500 dark:text-yellow-400 font-bold hover:underline">
            contacto@pokemoncardexplorer.com
          </a>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
.faq-enter-active { transition: all 0.3s ease; }
.faq-leave-active { transition: all 0.2s ease; }
.faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
