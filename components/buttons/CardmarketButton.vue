<template>
  <GlassButton label="Ver en Cardmarket" icon="🔗" :onClick="openCardmarket"/>
</template>

<script setup lang="ts">
import GlassButton from "./GlassButton.vue";

const props = defineProps<{ cardUrl: string }>();

const openCardmarket = () => {
  // Verificar que la URL esté disponible antes de intentar abrirla
  if (props.cardUrl && props.cardUrl !== "") {
    console.log(props.cardUrl)
    window.open(props.cardUrl, "_blank");
  } else {
    console.error("No hay URL disponible para esta carta.");
    alert("No hay enlace disponible para esta carta.");
  }
};
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
