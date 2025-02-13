import { instatce } from './todoListsApi';
import { ResponseType } from './todoListsApi';

export type TaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTaskListsResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export const taskListApi = {
  getTaskLists(todolistId: string) {
    return instatce.get<GetTaskListsResponseType>(
      `todo-lists/${todolistId}/tasks`
    );
  },
  createTask(todolistId: string, title: string) {
    return instatce.post<{ item: TaskType }>(`todo-lists/${todolistId}/tasks`, {
      title,
    });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instatce.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instatce.put(`todo-lists/${todolistId}/tasks/${taskId}`, {
      title,
    });
  },
  changeTaskStatus(todolistId: string, taskId: string, task: TaskType) {
    return instatce.put(`todo-lists/${todolistId}/tasks/${taskId}`, task);
  },
};
