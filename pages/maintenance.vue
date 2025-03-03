<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative overflow-hidden">

    <!-- Efecto de fondo dinámico -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-40 blur-2xl animate-pulse"></div>

    <!-- Contenido principal -->
    <div class="relative z-10 text-center p-6 max-w-lg">

      <!-- Imagen de Tinkaton -->
      <img src="/images/tinkaton.png" alt="Tinkaton Mantenimiento"
        class="w-64 mx-auto mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-500" />

      <!-- Mensaje de mantenimiento -->
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
        ¡Estamos en mantenimiento!
      </h1>
      <p class="text-lg text-gray-300 mb-6">
        Actualmente estamos trabajando en mejorar la experiencia. 🚀
        Vuelve pronto para descubrir nuevas funciones.
      </p>

      <!-- Botón de regreso -->
      <UButton
        to="/"
        color="gray"
        variant="solid"
        class="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Volver al inicio
      </UButton>

    </div>
  </div>
</template>

<style scoped>
/* Efecto de animación para el fondo */
@keyframes neonGlow {
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
}
.animate-pulse {
  animation: neonGlow 4s infinite ease-in-out;
}
</style>
