<template>
  <aside class="w-64 h-screen bg-white dark:bg-gray-900 shadow-md p-4 fixed left-0 top-0 overflow-y-auto">
    <div v-for="section in menuSections" :key="section.id" class="mb-4">
      <!-- Botón de cada sección -->
      <button
        @click="toggleSection(section.id)"
        class="w-full flex items-center justify-between p-2 text-lg font-bold bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <span class="ml-2">{{ section.label }}</span>
        <Icon :name="openSections[section.id] ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-5 h-5" />
      </button>

      <!-- Contenido de la sección -->
      <Transition name="slide">
        <ul v-show="openSections[section.id]" class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{'h-auto opacity-100': openSections[section.id], 'h-0 opacity-0': !openSections[section.id]}"
        >
          <li
            v-for="item in section.items"
            :key="item.id"
            class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition flex items-center gap-2"
            @click="goToPage(item.link)"
          >
            <!-- Si la colección tiene un logo, se muestra -->
              <img v-if="(item as any).logo" :src="(item as any).logo" :alt="item.label" class="w-6 h-6 object-contain" />
            <!-- Si no tiene logo, se muestra un ícono por defecto -->
            <Icon v-else :name="item.icon" class="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </li>
        </ul>
      </Transition>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const openSections = reactive<{ [key: string]: boolean }>({
  collections: false,
  favorites: false,
  settings: false,
});

const collections = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const menuSections: any[] = reactive([
  {
    id: "collections",
    label: "Colecciones",
    items: [],
  },
  {
    id: "favorites",
    label: "Favoritos",
    items: [
      { id: "my-favs", label: "Mis Cartas", icon: "heroicons:star", link: "/favorites" },
    ],
  },
  {
    id: "settings",
    label: "Configuración",
    items: [
      { id: "profile", label: "Perfil", icon: "heroicons:user", link: "/profile" },
      { id: "theme", label: "Tema", icon: "heroicons:moon", link: "/theme" },
    ],
  },
]);

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response: any = await $apiClient("/sets");
    collections.value = response.data;

    // ⚡️ Actualizar el array dentro de `menuSections` reactivamente
    Object.assign(menuSections.find(s => s.id === "collections")!, {
      items: collections.value.map((col: any) => ({
        id: col.id,
        label: col.name,
        logo: col.images.logo,
        icon: "heroicons:collection",
        link: `/collection/${col.id}`,
      })),
    });
  } catch (err) {
    error.value = "No se pudieron obtener las colecciones.";
    console.error("Error al obtener las colecciones:", err);
  } finally {
    loading.value = false;
  }
});

const toggleSection = (sectionId: string) => {
  openSections[sectionId] = !openSections[sectionId];
};

const goToPage = (link: string) => {
  router.push(link);
};
</script>

<style scoped>
/* Transición deslizante */
.slide-enter-active, .slide-leave-active {
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter-from, .slide-leave-to {
  height: 0;
  opacity: 0;
}

.slide-enter-to, .slide-leave-from {
  height: auto;
  opacity: 1;
}
</style>
