<template>
  <GlassButton label="Añadir a Favoritos" icon="❤️" :onClick="addToFavorites" />
</template>

<script setup lang="ts">
import GlassButton from "./GlassButton.vue";

defineProps<{ cardName: string }>();

const addToFavorites = () => {
  console.log(`Añadido a favoritos: ${cardName}`);
  alert(`${cardName} añadido a favoritos ❤️`);
};
</script>

<style scoped>
.glass-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
}
</style>
