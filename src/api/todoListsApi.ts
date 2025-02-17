import axios from 'axios';
import { TodoListType } from '../App';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '1ec1b59d-7183-4362-b849-2f97fdad106a',
  },
};

export const instatce = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export const todoListsApi = {
  getTodoLists() {
    return instatce.get<Array<TodoListType>>('todo-lists');
  },
  createTodoList(title: string) {
    return instatce.post<
      ResponseType<{
        item: TodoListType;
      }>
    >('todo-lists', { title });
  },
  deleteTodoList(todoListId: string) {
    return instatce.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
  updateTodoListTitle(todoListId: string, title: string) {
    return instatce.put<ResponseType>(`todo-lists/${todoListId}`, {
      title,
    });
  },
};
