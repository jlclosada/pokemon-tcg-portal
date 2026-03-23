<template>
  <div class="flex flex-col justify-center items-center gap-4 py-8">
    <div class="pokeball-spinner">
      <img src="/images/pokeball.png" alt="Loading" class="w-12 h-12 drop-shadow-lg" />
    </div>
    <div class="flex gap-1.5">
      <span class="dot dot-1"></span>
      <span class="dot dot-2"></span>
      <span class="dot dot-3"></span>
    </div>
  </div>
</template>

<style scoped>
.pokeball-spinner {
  animation: pokeball-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes pokeball-spin {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fbbf24;
  animation: dot-bounce 1.2s ease-in-out infinite;
}
.dot-1 { animation-delay: 0s; }
.dot-2 { animation-delay: 0.15s; }
.dot-3 { animation-delay: 0.3s; }
@keyframes dot-bounce {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.2); }
}
</style>
