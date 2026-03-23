<template>
  <UModal v-model="isOpen">
    <div class="p-8 text-center">
      <img src="/images/pokeball.png" alt="Pokéball" class="w-16 h-16 mx-auto mb-4 animate-bounce" />
      <h2 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        ¡Bienvenido al mundo Pokémon!
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Tu cuenta ha sido creada correctamente. ¡Disfruta explorando!
      </p>
      <UButton
        class="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold hover:from-yellow-500 hover:to-orange-600 transition-all"
        @click="closeModal"
      >
        ¡Empezar a explorar!
      </UButton>
    </div>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(true);
const emit = defineEmits(['close']);

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};
</script>
