<template>
  <div class="p-4 w-full flex flex-col items-center space-y-3 ">

    <!-- Botones en una fila más compacta -->
    <div class="flex flex-wrap justify-center gap-2 w-full">
      <FavoriteButton :cardName="card.name" class="w-auto px-4 py-2" />
      <CardmarketButton :cardUrl="card.cardmarket?.url || card.tcgplayer?.url" class="w-auto px-4 py-2" />
      <ViewCardDetail class="w-auto px-4 py-2" />
    </div>

  </div>
</template>


<script setup lang="ts">
import CardmarketButton from "./buttons/CardmarketButton.vue";
import FavoriteButton from "./buttons/FavoriteButton.vue";
import ViewCardDetail from "./buttons/ViewCardDetail.vue";

const props = defineProps<{ card: any }>();

const formatArray = (array) =>
  array?.map((item) => item.type + " (" + item.value + ")").join(", ") || "N/A";
</script>

<style scoped>
/* Transición suave de escala en hover */
.mt-4:hover {
  transform: scale(1.05);
}

/* Título con efecto de sombra para resaltar */
h2 {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.6);
}

/* Botones */
button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
