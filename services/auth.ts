import { useNuxtApp } from '#app';

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age: number;
}) => {
  const { $axios } = useNuxtApp(); // Obtén la instancia de Axios
  const response = await $axios.post('/users/register/', userData);
  return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const { $axios } = useNuxtApp(); // Obtén la instancia de Axios
  const response = await $axios.post('/users/login/', credentials);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
};