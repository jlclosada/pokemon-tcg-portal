<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
    <!-- Efecto de fondo -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-700/20 to-blue-600/20 blur-3xl animate-pulse-slow" />
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
    </div>

    <!-- Contenido -->
    <div class="relative z-10 text-center p-6 max-w-lg animate-fade-in-up">
      <img src="/images/tinkaton.png" alt="En mantenimiento"
        class="w-56 mx-auto mb-8 drop-shadow-2xl animate-float" />

      <h1 class="text-4xl md:text-5xl font-extrabold text-pokemon-gradient mb-4">
        ¡En construcción!
      </h1>
      <p class="text-lg text-gray-400 mb-8 leading-relaxed">
        Estamos trabajando en esta sección para ofrecerte la mejor experiencia. 🚀<br/>
        Vuelve pronto para descubrir nuevas funciones.
      </p>

      <UButton to="/" size="lg"
        class="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_4px_20px_rgba(255,203,5,0.4)]"
      >
        ← Volver al inicio
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
</style>
