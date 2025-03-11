<template>
  <router-link
    :to="link"
    class="relative group block rounded-xl overflow-hidden bg-gray-800 bg-opacity-80 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105"
  >
    <!-- Contenedor de icono -->
    <div class="flex justify-center items-center mt-6">
      <img v-if="iconType === 'image'" :src="icon" alt="icon" class="w-16 h-16 filter invert brightness-100 group-hover:brightness-75 transition-all duration-300">
      <UIcon v-else-if="iconType === 'icon'" :name="'i-heroicons-' + iconName" class="text-yellow-400 text-5xl group-hover:text-yellow-300 transition-colors duration-300" />
    </div>

    <!-- Contenido -->
    <div class="p-5 text-center">
      <h3 class="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
        {{ title }}
      </h3>
      <p class="text-gray-300 text-sm">{{ description }}</p>
    </div>

    <!-- Efecto de brillo en el borde inferior -->
    <div class="absolute bottom-0 left-1/2 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2"></div>

    <!-- Borde luminoso dinámico -->
    <div class="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-yellow-400 transition-all duration-500"></div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: String,
  description: String,
  iconType: String, // 'icon' o 'image'
  iconName: String, // Nombre del icono (por ejemplo, 'home', 'pokedex', etc.)
  icon: String, // Ruta de la imagen para los iconos de tipo 'image'
  link: String
});
</script>

<style scoped>
/* Estilo base de la tarjeta */
.category-card {
  background: rgba(255, 255, 255, 0.1); /* Efecto glassmorphism */
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  animation: fadeInUp 0.6s ease-in-out;
}

/* Efecto hover moderno */
.category-card:hover {
  transform: scale(1.07);
  box-shadow: 0px 4px 30px rgba(0, 255, 255, 0.6);
  border-color: rgba(0, 255, 255, 0.5);
}

/* Contenedor de icono */
.icon-container {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilo para imágenes */
.icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Estilo para iconos SVG */
.icon-svg {
  font-size: 2.5rem;
  color: white;
  transition: transform 0.3s ease, color 0.3s ease;
}

/* Hover: cambiar color del icono */
.category-card:hover .icon-svg {
  color: cyan;
  transform: scale(1.1);
}

/* Título */
.title {
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Descripción */
.description {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

/* Enlace */
.link {
  display: inline-block;
  margin-top: 16px;
  color: cyan;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

/* Hover en el enlace */
.link:hover {
  color: white;
  transform: translateX(5px);
}

/* Animación de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
