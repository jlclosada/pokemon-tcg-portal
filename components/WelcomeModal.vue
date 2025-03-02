<template>
    <UModal v-model="isOpen">
      <div class="p-6 text-center">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to Pokémon!</h2>
        <p class="text-gray-600 dark:text-gray-400">Your new account is now active. Enjoy exploring!</p>
        <UButton
          class="mt-6 bg-yellow-400 text-black hover:bg-yellow-500"
          @click="closeModal"
        >
          Close
        </UButton>
      </div>
    </UModal>
  </template>
  
  <script setup lang="ts">
  const isOpen = ref(true); // El modal se muestra automáticamente
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    isOpen.value = false;
    emit('close');
  };
  </script>