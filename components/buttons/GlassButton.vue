<template>
  <button class="glass-button" @click="onClick">
    <span v-if="icon">{{ icon }}</span> {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  icon?: string;
  onClick: () => void;
}>();
</script>

<style scoped>
.glass-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.glass-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.3);
}

/* Mejorar la animación de la pseudo-clase */
.glass-button::before {
  content: "";
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 10%, transparent 70%);
  transition: all 0.5s ease;
}

.glass-button:hover::before {
  top: 0;
  left: 0;
}
</style>
