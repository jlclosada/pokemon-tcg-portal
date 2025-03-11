<template>
  <div class="p-4 w-full flex flex-col items-center space-y-3">
    <!-- Contenedor de botones -->
    <div class="flex flex-wrap justify-center gap-6 w-full">
      <!-- Botón de favoritos -->
      <button @click="toggleFavorite" class="neon-btn fire text-left">
        <span class="icon">❤️</span>
        {{ isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos" }}
      </button>

      <!-- Botón de Cardmarket -->
      <button v-if="card.cardmarket?.url || card.tcgplayer?.url" @click="openCardMarket" class="neon-btn water text-left">
        <span class="icon">💰</span>Cardmarket
      </button>

      <!-- Botón de detalles -->
      <button @click="viewCardDetails" class="neon-btn electric text-left">
        <span class="icon">🔍</span> Ver Detalles
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ card: any }>();
const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  alert(isFavorite.value ? "Añadido a Favoritos" : "Eliminado de Favoritos");
};

const openCardMarket = () => {
  const url = props.card.cardmarket?.url || props.card.tcgplayer?.url;
  if (url) window.open(url, "_blank");
};

const viewCardDetails = () => {
  alert(`Mostrando detalles de ${props.card.name}`);
};
</script>

<style scoped>
/* Estilos base de los botones */
.neon-btn {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 14px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 12px;
  width: 270px;
  height: 65px;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  color: white;
  transition: all 0.4s ease-in-out;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
}

/* Efecto de borde dinámico */
.neon-btn::before {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 16px;
  background: linear-gradient(90deg, var(--glow-start), var(--glow-end));
  z-index: -1;
  filter: blur(10px);
  opacity: 0.7;
  transition: all 0.4s ease-in-out;
  animation: pulse 2s infinite alternate;
}

/* Luz interna para mayor profundidad */
.neon-btn::after {
  content: "";
  position: absolute;
  inset: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  z-index: -1;
}

/* Animación de luz pulsante */
@keyframes pulse {
  0% {
    filter: blur(8px);
    opacity: 0.6;
  }
  100% {
    filter: blur(14px);
    opacity: 1;
  }
}

/* Efecto de brillo al pasar el cursor */
.neon-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 20px var(--glow-start);
}

/* Distorsión al hacer clic */
.neon-btn:active {
  transform: scale(0.97);
  filter: brightness(1.2);
}

/* Iconos con animación sutil */
.icon {
  font-size: 1.5rem;
  transition: transform 0.2s ease-in-out;
}

.neon-btn:hover .icon {
  transform: rotate(5deg) scale(1.2);
}

/* 🎨 Colores Modernos */

/* 🔥 Botón de favoritos (rojo vibrante y oscuro) */
.fire {
  --glow-start: #e8141e;
  --glow-end: #dfb6b6;
  background: rgba(60, 10, 10, 0.8);
}

/* 💧 Botón de compra (azul eléctrico) */
.water {
  --glow-start: #0f63ea;
  --glow-end: #bbcce1;
  background: rgba(41, 41, 167, 0.8);
}

/* ⚡ Botón de detalles (dorado elegante) */
.electric {
  --glow-start: #e5a910;
  --glow-end: #e4ddc2;
  background: rgba(60, 50, 10, 0.8);
  color: black;
}

/* Fuente moderna */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
</style>
