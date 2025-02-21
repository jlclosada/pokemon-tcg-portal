<template>
  <div class="flex justify-center items-center h-32">
    <img
      src="/images/pokeball.png"
      alt="Loading..."
      class="w-16 h-16 animate-bounce-spin"
    />
  </div>
</template>

<style scoped>
@keyframes bounce-spin {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(90deg);
  }
  50% {
    transform: translateY(0) rotate(180deg);
  }
  75% {
    transform: translateY(-5px) rotate(270deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}

.animate-bounce-spin {
  animation: bounce-spin 1s ease-in-out infinite;
}
</style>
