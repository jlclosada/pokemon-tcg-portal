<template>
  <div class="global-search">
    <div class="search-input-wrapper">
      <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" stroke-linecap="round" />
      </svg>
      <input
        v-model="query"
        @keydown.enter="goToSearch"
        type="text"
        placeholder="Buscar cualquier carta... (ej: Charizard, Pikachu)"
        class="search-input"
      />
      <button v-if="query" @click="goToSearch" class="search-go">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = ref('');

const goToSearch = () => {
  const q = query.value.trim();
  if (q.length >= 2) {
    router.push({ path: '/search', query: { q } });
  }
};
</script>

<style scoped>
.global-search {
  position: relative;
  width: 100%;
}
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.35);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 16px 52px 16px 48px;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 16px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
}
.search-input:focus {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3);
}
.search-go {
  position: absolute;
  right: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.25);
  color: #fbbf24;
  cursor: pointer;
  transition: all 0.2s;
}
.search-go:hover {
  background: rgba(251, 191, 36, 0.25);
  transform: translateX(2px);
}
</style>
