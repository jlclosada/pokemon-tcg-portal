<template>
  <div class="flex flex-col justify-center items-center gap-3 py-8">
    <div class="pokeball-spinner">
      <img src="/images/pokeball.png" alt="Cargando..." class="w-14 h-14" />
    </div>
    <p class="text-sm text-gray-400 animate-pulse">Cargando...</p>
  </div>
</template>

<style scoped>
.pokeball-spinner {
  animation: pokeball-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes pokeball-spin {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) rotate(90deg);
  }
  50% {
    transform: translateY(0) rotate(180deg);
  }
  75% {
    transform: translateY(-4px) rotate(270deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}
</style>
