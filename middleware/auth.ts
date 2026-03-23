// Middleware de autenticación - solo se aplica a páginas que lo requieran con definePageMeta({ middleware: 'auth' })
export default defineNuxtRouteMiddleware((to, _from) => {
  if (import.meta.client) {
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  }
});
