<template>
  <GlassButton label="Ver carta en detalle" icon="🔍" @click="redirectToMaintenance" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import GlassButton from "./GlassButton.vue";

const router = useRouter();

const redirectToMaintenance = () => {
  router.push("/maintenance");
};
</script>


  <style scoped>
  /* Puedes agregar estilos aquí si es necesario */
  </style>
