// Este middleware se encarga de verificar si el usuario esta autenticado, si no lo esta lo redirige a la pagina de login
// Importa la función defineNuxtRouteMiddleware de 'nuxt'
export default defineNuxtRouteMiddleware((to, from) => { // Define un middleware de ruta
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage
    if (!token && to.path !== '/login') { // Si no hay token y la ruta no es '/login'
      return navigateTo('/login'); // Redirige a la ruta '/login'
    }
  });
