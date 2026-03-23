<template>
  <NuxtLink
    :to="link"
    class="group relative block rounded-2xl overflow-hidden bg-gray-800/60 backdrop-blur-md border border-gray-700/40 transition-all duration-500 hover:scale-[1.04] hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(255,203,5,0.15)]"
  >
    <!-- Glow de fondo -->
    <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-purple-500/0 group-hover:from-yellow-400/10 group-hover:to-purple-500/10 transition-all duration-500" />

    <!-- Contenido -->
    <div class="relative p-8 text-center">
      <!-- Icono -->
      <div class="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-gray-700/50 group-hover:bg-yellow-400/20 transition-all duration-300">
        <img v-if="iconType === 'image'" :src="icon" alt="" class="w-10 h-10 filter invert brightness-100 group-hover:brightness-75 transition-all duration-300" />
        <UIcon v-else-if="iconType === 'icon'" :name="'i-heroicons-' + iconName" class="text-yellow-400 text-3xl group-hover:text-yellow-300 transition-colors duration-300" />
      </div>

      <h3 class="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-sm leading-relaxed">{{ description }}</p>
    </div>

    <!-- Barra inferior animada -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full group-hover:w-3/4 transition-all duration-500" />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  iconType?: string
  iconName?: string
  icon?: string
  link: string
}>();
</script>
