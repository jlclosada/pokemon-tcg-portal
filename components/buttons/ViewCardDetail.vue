<template>
    <GlassButton label="Ver carta en detalle" icon="🔍" :onClick="openCardmarket" />
  </template>

  <script setup lang="ts">
  import GlassButton from "./GlassButton.vue";

  const props = defineProps<{ cardUrl: string }>();

  </script>

  <style scoped>
  /* Puedes agregar estilos aquí si es necesario */
  </style>
