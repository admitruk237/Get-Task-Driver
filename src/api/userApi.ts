import axios from 'axios';
import { AuthResponse, SignInType, SignUpType } from '../types/api.interface';
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants';

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const api = axios.create({ baseURL });

// Додаємо токен до запитів
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userApi = {
  signUp: (data: SignUpType) =>
    api.post<AuthResponse['signUpResponse']>(API_ENDPOINTS.AUTH.SIGNUP, data),

  async signInApi(data: SignInType) {
    const { data: response } = await api.post<AuthResponse['signInResponse']>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    if (!response.accessToken || !response.refreshToken)
      throw new Error('Немає токенів');

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

    return {
      ...response,
    };
  },
};

export default api;
