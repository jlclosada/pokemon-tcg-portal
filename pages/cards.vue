<template>
  <div class="flex flex-col min-h-screen">
    <!-- Sección principal -->
    <HomeScreen />
    <!-- Cartas destacadas -->
    <BestCards />
  </div>
</template>

<script setup>
import HomeScreen from "~/components/HomeCards.vue";
import BestCards from "~/components/BestCards.vue";
</script>
