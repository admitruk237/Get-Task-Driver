import axios from 'axios';
import { refreshAccessToken } from './signInApi';

const api = axios.create({
  baseURL: 'https://todo-backend-777.up.railway.app/auth/login',
});

// 📌 Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📌 Автоматично оновлюємо токен, якщо отримаємо 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Повторюємо запит
      } catch (refreshError) {
        console.error('Помилка оновлення токена:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
