import { TaskType } from '../types/todo.interface';
import api from './userApi';
import { AxiosResponse } from 'axios';
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants';

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

export const taskApi = {
  createTask: async (data: TaskType): Promise<AxiosResponse<TaskType>> => {
    return api.post<TaskType>(API_ENDPOINTS.TASKS, data, {
      headers: getAuthHeaders(),
    });
  },

  deleteTask: async (taskId: number): Promise<AxiosResponse<void>> => {
    return api.delete<void>(`${API_ENDPOINTS.TASKS}/${taskId}`, {
      headers: getAuthHeaders(),
    });
  },

  updateTask: async (
    taskId: number,
    data: Partial<TaskType>
  ): Promise<AxiosResponse<TaskType>> => {
    return api.put<TaskType>(`${API_ENDPOINTS.TASKS}/${taskId}`, data, {
      headers: getAuthHeaders(),
    });
  },
};
