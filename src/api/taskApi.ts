import { TaskType } from '../types/todo.interface';
import api from './userApi';

export const taskApi = {
  createTask: (data: TaskType): Promise<any> => {
    return api.post<TaskType>('/tasks', { ...data });
  },
  deleteTask: (taskId: number) => {
    return api.delete<TaskType>(`/tasks/${taskId}`);
  },
};
