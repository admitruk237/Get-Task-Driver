import { AxiosError } from 'axios';
import api from './userApi';
import { STORAGE_KEYS, API_ENDPOINTS, ROUTES } from '../utils/constants';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (!accessToken) {
    throw new Error('Access token is missing. Please log in.');
  }
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
};

const refreshAccessToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

  if (!refreshToken) {
    localStorage.clear();
    window.location.href = ROUTES.LOGIN;
    throw new Error('No refresh token available. Please log in.');
  }

  try {
    const { data } = await api.post<{
      accessToken: string;
      refreshToken: string;
    }>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
  } catch (error) {
    localStorage.clear();
    window.location.href = ROUTES.LOGIN;
    throw new Error('Failed to refresh token. Please log in again.');
  }
};

const handleRequest = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      await refreshAccessToken();
      return await request(); // Повторний запит після оновлення токена
    }
    throw error instanceof Error
      ? new Error(error.message)
      : new Error('An unknown error occurred');
  }
};

export const todoApi = {
  getTodos: () =>
    handleRequest(() =>
      api
        .get(API_ENDPOINTS.TODOS, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),

  createTodo: (title: string) =>
    handleRequest(() =>
      api
        .post(API_ENDPOINTS.TODOS, { title }, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),
};
