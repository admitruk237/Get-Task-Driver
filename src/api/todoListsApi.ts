import axios from 'axios';
import { TodoListType } from '../AppWithRedux';

export const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '649018f5-5484-4c71-abcc-dbbfa2a9bce4',
  },
};

export type CreateTypeTodoListResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    item: TodoListType;
  };
};

export const todoListsApi = {
  getTodoLists() {
    const promise = axios.get<Array<TodoListType>>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      settings
    );
    return promise;
  },
  createTodoList(title: string) {
    const promise = axios.post<CreateTypeTodoListResponseType>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      { title },
      settings
    );
    return promise;
  },
  deleteTodoList(todoListId: string) {
    const promise = axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`,
      settings
    );
    return promise;
  },
  updateTodoListTitle(todoListId: string, title: string) {
    const promise = axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`,
      { title },
      settings
    );
    return promise;
  },
};
