<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <div class="max-w-5xl mx-auto px-4 pt-10 pb-6">
      <!-- Buscador -->
      <div class="search-bar">
        <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" stroke-linecap="round" />
        </svg>
        <input
          ref="inputRef"
          v-model="query"
          @input="onInput"
          type="text"
          placeholder="Buscar cartas..."
          class="search-input"
        />
        <div v-if="loading" class="search-spinner" />
        <button v-else-if="query" @click="clearSearch" class="search-clear">✕</button>
      </div>

      <!-- Info -->
      <p v-if="totalCount > 0" class="text-center text-sm text-gray-500 mt-4">
        {{ totalCount }} resultado{{ totalCount !== 1 ? 's' : '' }} para "<span class="text-yellow-400 font-semibold">{{ lastQuery }}</span>"
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading && !results.length" class="flex justify-center py-20">
      <LoadingSpinner />
    </div>

    <!-- Resultados -->
    <div v-else-if="results.length" class="max-w-6xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="card in results"
          :key="card.id"
          class="result-card group"
          @click="goToCollection(card)"
        >
          <!-- Imagen -->
          <div class="result-card-img-wrapper">
            <img :src="card.images.small" :alt="card.name" loading="lazy" class="result-card-img" />
            <div class="result-card-holo" />
          </div>
          <!-- Info -->
          <div class="result-card-info">
            <h3 class="result-card-name">{{ card.name }}</h3>
            <div class="result-card-meta">
              <span class="result-card-set">{{ card.set?.name }}</span>
              <span class="result-card-number">#{{ card.number }}</span>
            </div>
            <div class="result-card-tags">
              <span v-if="card.rarity" class="tag tag-rarity">{{ card.rarity }}</span>
              <span v-if="card.hp" class="tag tag-hp">HP {{ card.hp }}</span>
              <span v-if="card.types?.length" class="tag tag-type">{{ card.types[0] }}</span>
            </div>
          </div>
          <!-- Arrow -->
          <svg class="result-card-arrow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Cargar más -->
      <div v-if="hasMore" class="flex justify-center mt-10">
        <button @click="loadMore" :disabled="loadingMore" class="load-more-btn">
          <span v-if="loadingMore">Cargando...</span>
          <span v-else>Cargar más resultados</span>
        </button>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-else-if="hasSearched && !loading" class="flex flex-col items-center py-24 px-4">
      <p class="text-xl text-gray-500">No se encontraron cartas para "<span class="text-white font-semibold">{{ lastQuery }}</span>"</p>
      <p class="text-sm text-gray-600 mt-2">Prueba con otro nombre o término</p>
    </div>

    <!-- Estado inicial -->
    <div v-else-if="!hasSearched" class="flex flex-col items-center py-24 px-4 text-center">
      <img src="/images/pokeball.png" alt="" class="w-16 h-16 opacity-20 mb-4" />
      <p class="text-lg text-gray-500">Escribe el nombre de una carta para buscar</p>
      <p class="text-sm text-gray-600 mt-1">Ej: Charizard, Pikachu, Mewtwo, Lugia...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const query = ref('');
const results = ref<any[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const loadingMore = ref(false);
const hasSearched = ref(false);
const lastQuery = ref('');
const currentPage = ref(1);
const hasMore = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const onInput = () => {
  const q = query.value.trim();
  if (debounceTimer) clearTimeout(debounceTimer);

  if (q.length < 2) {
    results.value = [];
    hasSearched.value = false;
    totalCount.value = 0;
    hasMore.value = false;
    // Actualizar URL sin recargar
    router.replace({ query: {} });
    return;
  }

  debounceTimer = setTimeout(() => {
    router.replace({ query: { q } });
    searchCards(q, 1);
  }, 400);
};

const searchCards = async (q: string, page: number) => {
  if (page === 1) loading.value = true;
  else loadingMore.value = true;

  hasSearched.value = true;
  lastQuery.value = q;
  currentPage.value = page;

  const { $apiClient } = useNuxtApp();
  try {
    const response: any = await $apiClient('/cards', {
      query: {
        q: `name:"${q}*"`,
        page,
        pageSize: 30,
        orderBy: '-set.releaseDate',
        select: 'id,name,number,images,rarity,hp,types,set',
      },
    });
    const data = response.data || [];
    totalCount.value = response.totalCount || 0;

    if (page === 1) results.value = data;
    else results.value = [...results.value, ...data];

    hasMore.value = results.value.length < totalCount.value;
  } catch (err) {
    console.error('Error buscando cartas:', err);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadMore = () => {
  if (lastQuery.value) searchCards(lastQuery.value, currentPage.value + 1);
};

const goToCollection = (card: any) => {
  if (card.set?.id) router.push(`/collection/${card.set.id}`);
};

const clearSearch = () => {
  query.value = '';
  results.value = [];
  hasSearched.value = false;
  totalCount.value = 0;
  hasMore.value = false;
  router.replace({ query: {} });
  inputRef.value?.focus();
};

// Al montar, leer query param de la URL
onMounted(() => {
  const q = route.query.q as string;
  if (q) {
    query.value = q;
    searchCards(q, 1);
  } else {
    inputRef.value?.focus();
  }
});
</script>

<style scoped>
/* ===== Buscador ===== */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 560px;
  margin: 0 auto;
}
.search-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 14px 48px 14px 48px;
  background: rgba(31, 41, 55, 0.6);
  border: 1px solid rgba(75, 85, 99, 0.4);
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;
}
.search-input:focus {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}
.search-input::placeholder { color: rgba(255,255,255,0.3); }
.search-clear {
  position: absolute;
  right: 14px;
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: rgba(75,85,99,0.5);
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.search-clear:hover { background: rgba(251,191,36,0.3); color: #fff; }
.search-spinner {
  position: absolute; right: 16px;
  width: 20px; height: 20px;
  border: 2px solid rgba(251,191,36,0.3);
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ===== Result Card ===== */
.result-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: rgba(31, 41, 55, 0.4);
  border: 1px solid rgba(75, 85, 99, 0.2);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.result-card:hover {
  background: rgba(31, 41, 55, 0.7);
  border-color: rgba(251, 191, 36, 0.25);
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.result-card-img-wrapper {
  position: relative;
  flex-shrink: 0;
  width: 64px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
}
.result-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.result-card-holo {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, transparent 55%);
  background-size: 250% 100%;
  transition: opacity 0.3s;
}
.result-card:hover .result-card-holo {
  opacity: 1;
  animation: holo-sweep 1.5s ease-in-out infinite;
}
@keyframes holo-sweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.result-card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.result-card-name {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}
.result-card:hover .result-card-name { color: #fbbf24; }

.result-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.result-card-set {
  font-size: 12px;
  font-weight: 500;
  color: rgba(251, 191, 36, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result-card-number {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
}

.result-card-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.tag {
  font-size: 9px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.tag-rarity {
  color: #fbbf24;
  background: rgba(251,191,36,0.1);
  border: 1px solid rgba(251,191,36,0.15);
}
.tag-hp {
  color: #f87171;
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.15);
}
.tag-type {
  color: #60a5fa;
  background: rgba(96,165,250,0.1);
  border: 1px solid rgba(96,165,250,0.15);
}

.result-card-arrow {
  width: 18px; height: 18px;
  color: rgba(255,255,255,0.1);
  flex-shrink: 0;
  transition: all 0.3s;
}
.result-card:hover .result-card-arrow {
  color: #fbbf24;
  transform: translateX(3px);
}

/* ===== Load More ===== */
.load-more-btn {
  padding: 12px 32px;
  background: rgba(31,41,55,0.5);
  border: 1px solid rgba(75,85,99,0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.load-more-btn:hover {
  background: rgba(251,191,36,0.1);
  border-color: rgba(251,191,36,0.3);
}
.load-more-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

