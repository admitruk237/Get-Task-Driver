import axios from 'axios';
import { settings } from './todoListsApi';

export const taskListApi = {
  getTaskLists(todolistId: string) {
    const promise = axios.get(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      settings
    );
    return promise;
  },
  createTask(todolistId: string, title: string) {
    const promise = axios.post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title },
      settings
    );
    return promise;
  },
  deleteTask(todolistId: string, taskId: string) {
    const promise = axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      settings
    );
    return promise;
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    const promise = axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      { title },
      settings
    );
    return promise;
  },
};

const createTask = taskListApi.createTask('1', 'New Task');

const tasks = taskListApi.getTaskLists('1');
console.log(tasks);
