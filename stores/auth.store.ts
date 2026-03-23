// stores/auth.store.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as any,
  }),
  actions: {
    login(token: string, user: any) {
      this.isAuthenticated = true;
      this.user = user;
      if (import.meta.client) {
        localStorage.setItem('token', token);
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      if (import.meta.client) {
        localStorage.removeItem('token');
      }
    },
    checkAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('token');
        this.isAuthenticated = !!token;
      }
    },
  },
});