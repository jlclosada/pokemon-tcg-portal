// stores/auth.store.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // Estado de autenticación
    user: null as any, // Información del usuario
  }),
  actions: {
    // Método para iniciar sesión
    login(token: string, user: any) {
      this.isAuthenticated = true;
      this.user = user;
      localStorage.setItem('token', token); // Guarda el token en localStorage
    },
    // Método para cerrar sesión
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem('token'); // Elimina el token del localStorage
    },
    // Método para verificar la autenticación al cargar la página
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAuthenticated = true;
        // Aquí podrías hacer una solicitud al backend para obtener la información del usuario
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});