<!-- components/CardmarketButton.vue -->
<template>
  <GlassButton label="Ver en Cardmarket" icon="🔗" :onClick="openCardmarket" />
</template>

<script setup lang="ts">
import GlassButton from "./GlassButton.vue";

defineProps<{ cardUrl: string }>();

const openCardmarket = () => {
  if (cardUrl) {
    window.open(cardUrl, "_blank");
  } else {
    alert("No hay enlace disponible para esta carta.");
  }
};
</script>
