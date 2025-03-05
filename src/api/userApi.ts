import axios from 'axios';
import { AuthResponse, SignInType, SignUpType } from '../types/api.interface';

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const api = axios.create({ baseURL });

// Додаємо токен до запитів
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userApi = {
  signUp: (data: SignUpType) =>
    api.post<AuthResponse['signUpResponse']>('/auth/signup', data),

  async signInApi(data: SignInType) {
    const { data: response } = await api.post<AuthResponse['signInResponse']>(
      '/auth/login',
      data
    );
    if (!response.accessToken || !response.refreshToken)
      throw new Error('Немає токенів');

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return {
      ...response,
    };
  },
};

export default api;
