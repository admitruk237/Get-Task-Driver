import { todoApi } from '../api/todoApi';
import { ResponseTypeTodo } from '../types/todo.interface';

export const fetchTodoList = async (): Promise<Array<ResponseTypeTodo>> => {
  return await todoApi.getTodos();
};

export const createTodo = async (title: string) => {
  return await todoApi.createTodo(title);
};

/* export const createTask = async (task: Task): Promise<Array<Task>> => {
  return await taskApi.createTask(task);
};

export const deleteTask = async (taskId: string) => {
  return await taskApi.deleteTask(taskId);
}; */
