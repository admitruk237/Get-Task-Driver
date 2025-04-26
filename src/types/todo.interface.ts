export interface TaskType {
  date: Date | string;
  id: number;
  title: string;
  description: string;
  endDate: string;
  completed: boolean;
  priority: string;
  todoId: string;
  order: number;
  status: string;
  userId: string;
}

export type FilteredValuesType = 'All' | 'Active' | 'Completed';
export interface ResponseTypeTodo {
  id: string;
  userId: string;
  filter: FilteredValuesType;
  title: string;
  createdAt: string;
  tasks: TaskType[];
}

export interface ResponseType<D = {}> {
  resultCode: number;
  messages: Array<string>;
  data: D;
}

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
