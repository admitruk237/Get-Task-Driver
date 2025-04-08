import axios, { AxiosError } from 'axios';
import api from './userApi';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing. Please log in.');
  }
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
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
      api.get('/todos', { headers: getAuthHeaders() }).then((res) => res.data)
    ),

  createTodo: (title: string) =>
    handleRequest(() =>
      api
        .post('/todos', { title }, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),
};

function refreshAccessToken() {
  throw new Error('Function not implemented.');
}
