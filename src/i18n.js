import { Languages } from 'lucide-vue-next';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    weight: "Weight",
    height: "Height",
    abilities: "Abilities",
    stats: "Stats",
    moves: "Moves",
    statistics: "Statistics",
    language: "Language",
    home: "Home",
    pokedex: "Pokedex",
    profile: "Profile",
    collections: "Collections",
    favorites: "Favorites",
    about_us: "About Us",
    fire: "Fire",
    water: "Water",
    grass: "Grass",
    electric: "Electric",
    ice: "Ice",
    fighting: "Fighting",
    poison: "Poison",
    ground: "Ground",
    flying: "Flying",
    psychic: "Psychic",
    steel: "Steel",
    bug: "Bug",
    rock: "Rock",
    ghost: "Ghost",
    dragon: "Dragon",
    dark: "Dark",
    fairy: "Fairy",
    normal: "Normal",
  },
  es: {
    weight: "Peso",
    height: "Altura",
    abilities: "Habilidades",
    stats: "Estadísticas",
    moves: "Movimientos",
    language: "Idioma",
    home: "Inicio",
    pokedex: "Pokedex",
    profile: "Perfil",
    collections: "Colecciones",
    favorites: "Favoritos",
    about_us: "Sobre Nosotros",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    fairy: "Hada",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    normal: "Normal",
  }
};

const i18n = createI18n({
  locale: 'es', // Idioma por defecto
  fallbackLocale: 'en', // Si falta una traducción, usa inglés
  messages
});

export default i18n;
