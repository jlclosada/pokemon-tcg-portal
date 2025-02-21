<template>
  <div class="flex justify-center items-center">
    <img
      src="/images/pokeball.png"
      alt="Loading..."
      class="w-16 h-16 animate-spin"
    />
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
