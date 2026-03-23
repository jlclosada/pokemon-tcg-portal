<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <div class="flex flex-col items-center pt-10 pb-4 px-4">
      <img v-if="collection?.images?.logo" :src="collection.images.logo" :alt="collection?.name"
        class="w-44 sm:w-56 object-contain drop-shadow-lg" />
      <div v-if="collection" class="flex items-center gap-3 mt-3">
        <span class="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">{{ collection.total }} cartas</span>
        <span v-if="collection.releaseDate" class="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">{{ collection.releaseDate }}</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center mt-16">
      <LoadingSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-400 text-lg">⚠️ {{ error }}</p>
    </div>

    <template v-else>
      <!-- Barra de búsqueda -->
      <CardSearch @update:filters="updateFilters" />

      <!-- Contador -->
      <p v-if="cards.length" class="text-center text-xs text-gray-500 mt-4 mb-1">
        {{ filteredCards.length }} <span v-if="filteredCards.length !== cards.length">de {{ cards.length }}</span> cartas
      </p>

      <!-- Grid de cartas -->
      <div v-if="filteredCards.length" class="max-w-[1400px] mx-auto px-3 sm:px-5 pb-16 mt-4">
        <div class="card-grid">
          <div
            v-for="card in filteredCards"
            :key="card.id"
            class="card-wrapper"
            @click="selectCard(card)"
            @mousemove="handleMouseMove($event, card.id)"
            @mouseleave="handleMouseLeave(card.id)"
          >
            <div class="card-3d" :id="'card-' + card.id">
              <!-- Imagen -->
              <img
                :src="card.images.small"
                :alt="card.name"
                loading="lazy"
                class="card-img"
              />
              <!-- Efecto holográfico arcoíris -->
              <div class="holo-rainbow" />
              <!-- Brillo de reflejo -->
              <div class="holo-sparkle" :id="'sparkle-' + card.id" />
              <!-- Overlay info al hover -->
              <div class="card-overlay">
                <div class="card-overlay-content">
                  <span v-if="card.rarity" class="card-rarity">{{ card.rarity }}</span>
                  <span v-if="card.hp" class="card-hp">HP {{ card.hp }}</span>
                </div>
              </div>
            </div>
            <!-- Nombre -->
            <div class="card-label">
              <span class="card-number">#{{ card.number }}</span>
              <span class="card-name">{{ card.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="hasSearched" class="flex flex-col items-center justify-center py-20">
        <p class="text-lg font-semibold text-gray-500">Sin resultados para esos filtros</p>
      </div>
    </template>

    <!-- Slide-over detalles -->
    <CardDetails :card="selectedCard" v-model:isOpen="isSlideOverOpen" />
  </div>
</template>

<script setup lang="ts">
import CardDetails from "@/components/CardDetails.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const collectionId = route.params.id;
const collection = ref<any>(null);
const cards = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedCard = ref<any>(null);
const isSlideOverOpen = ref(false);

const filters = ref({ name: "", rarity: "", number: "" });

const filteredCards = computed(() =>
  cards.value.filter((card: any) => {
    const n = !filters.value.name || card.name.toLowerCase().includes(filters.value.name.toLowerCase());
    const num = !filters.value.number || card.number.includes(filters.value.number);
    const r = !filters.value.rarity || (card.rarity?.toLowerCase() === filters.value.rarity.toLowerCase());
    return n && num && r;
  })
);

const hasSearched = ref(false);
const updateFilters = (f: any) => { hasSearched.value = true; filters.value = f; };

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    // Peticiones en paralelo + select solo campos necesarios = mucho más rápido
    const [colRes, cardsRes]: any[] = await Promise.all([
      $apiClient(`/sets/${collectionId}`),
      $apiClient("/cards", {
        query: {
          q: `set.id:${collectionId}`,
          pageSize: 250,
          select: "id,name,number,images,rarity,hp,types,artist,set,cardmarket,tcgplayer",
          orderBy: "number",
        },
      }),
    ]);
    collection.value = colRes.data;
    cards.value = [...cardsRes.data].sort((a: any, b: any) => {
      const numA = parseInt(a.number) || 0;
      const numB = parseInt(b.number) || 0;
      if (numA !== numB) return numA - numB;
      return a.number.localeCompare(b.number);
    });
  } catch (err) {
    error.value = "No se pudieron obtener los datos.";
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
});

const selectCard = (card: any) => {
  selectedCard.value = card;
  isSlideOverOpen.value = true;
};

// === Efecto 3D con cursor ===
const handleMouseMove = (e: MouseEvent, cardId: string) => {
  const el = document.getElementById('card-' + cardId);
  const sparkle = document.getElementById('sparkle-' + cardId);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;

  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;

  if (sparkle) {
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    sparkle.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.35) 0%, transparent 60%)`;
    sparkle.style.opacity = '1';
  }
};

const handleMouseLeave = (cardId: string) => {
  const el = document.getElementById('card-' + cardId);
  const sparkle = document.getElementById('sparkle-' + cardId);
  if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  if (sparkle) sparkle.style.opacity = '0';
};
</script>

<style scoped>
/* ===== Grid ===== */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  padding: 0 24px;
  max-width: 280px;
  margin: 0 auto;
}
@media (min-width: 480px) { .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; padding: 0 8px; max-width: none; margin: 0; } }
@media (min-width: 640px) { .card-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; } }
@media (min-width: 768px) { .card-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; } }
@media (min-width: 1024px) { .card-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px; } }
@media (min-width: 1280px) { .card-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 22px; } }

/* ===== Card wrapper ===== */
.card-wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  overflow: visible;
}

/* ===== Card 3D ===== */
.card-3d {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.15s ease-out, box-shadow 0.3s ease;
  will-change: transform;
  transform-style: preserve-3d;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  aspect-ratio: 2.5 / 3.5;
}
.card-wrapper:hover .card-3d {
  box-shadow:
    0 8px 40px rgba(255, 203, 5, 0.15),
    0 0 60px rgba(255, 203, 5, 0.06),
    0 20px 60px rgba(0, 0, 0, 0.5);
}

.card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  position: relative;
  z-index: 1;
}

/* ===== Holo arcoíris ===== */
.holo-rainbow {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: color-dodge;
  background:
    repeating-linear-gradient(
      133deg,
      rgba(255, 0, 0, 0.08) 0%,
      rgba(255, 154, 0, 0.08) 10%,
      rgba(208, 222, 33, 0.08) 20%,
      rgba(79, 220, 74, 0.08) 30%,
      rgba(63, 218, 216, 0.08) 40%,
      rgba(47, 107, 232, 0.08) 50%,
      rgba(111, 49, 200, 0.08) 60%,
      rgba(255, 0, 0, 0.08) 70%
    );
  background-size: 300% 300%;
  transition: opacity 0.4s ease;
}
.card-wrapper:hover .holo-rainbow {
  opacity: 1;
  animation: rainbow-shift 3s linear infinite;
}

@keyframes rainbow-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ===== Sparkle (sigue al cursor) ===== */
.holo-sparkle {
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
  mix-blend-mode: overlay;
}

/* ===== Overlay info ===== */
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  padding: 10px 8px 8px;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
  border-radius: 0 0 12px 12px;
  pointer-events: none;
}
.card-wrapper:hover .card-overlay {
  opacity: 1;
  transform: translateY(0);
}
.card-overlay-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-rarity {
  font-size: 9px;
  font-weight: 700;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.card-hp {
  font-size: 9px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
}

/* ===== Label nombre ===== */
.card-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 4px 6px;
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid rgba(75, 85, 99, 0.25);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}
.card-number {
  font-size: 10px;
  font-weight: 800;
  color: #fbbf24;
  flex-shrink: 0;
  line-height: 1;
}
.card-name {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
  transition: color 0.3s;
}
.card-wrapper:hover .card-name {
  color: #fff;
}
.card-wrapper:hover .card-label {
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(17, 24, 39, 0.9);
}

@media (min-width: 640px) {
  .card-label { padding: 5px 8px; border-radius: 10px; }
  .card-number { font-size: 11px; }
  .card-name { font-size: 11px; }
}
</style>
