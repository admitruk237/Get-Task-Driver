import axios from 'axios';
import { AuthResponse, SignInType, SignUpType } from '../types/api.interface';

const baseURL = 'https://todo-backend-777.up.railway.app';
const api = axios.create({ baseURL });

// Додаємо токен до запитів
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Оновлення токена при 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) return Promise.reject(error);

    try {
      const newToken = await refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axios(error.config);
    } catch (refreshError) {
      console.error('Помилка оновлення токена:', refreshError);
      return Promise.reject(refreshError);
    }
  }
);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('Немає refreshToken');

  const { data } = await axios.post<AuthResponse['signInResponse']>(
    `${baseURL}/auth/refresh`,
    { refreshToken }
  );

  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
};

export const userApi = {
  signUp: (data: SignUpType) =>
    api.post<AuthResponse['signUpResponse']>('/auth/signup', data),

  async signInApi(data: SignInType) {
    const { data: response } = await api.post<AuthResponse['signInResponse']>(
      '/auth/login',
      data
    );

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return {
      ...response,
      logoutApi: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
    };
  },
};

export default api;
