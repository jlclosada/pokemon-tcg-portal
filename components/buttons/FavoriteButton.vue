<!-- components/FavoriteButton.vue -->
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
