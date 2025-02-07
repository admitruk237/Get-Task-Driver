import axios from 'axios';
import { TodoListType } from '../AppWithRedux';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '649018f5-5484-4c71-abcc-dbbfa2a9bce4',
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
