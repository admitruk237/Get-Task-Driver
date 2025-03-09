export interface Task {
  date: Date;
  id: number;
  title: string;
  description: string;
  endDate: Date | null;
  completed: boolean;
  priority: string;
  todoId: string;
  order: number;
  status: string;
}

export interface Todo {
  id: string;
  filter: string;
  title: string;
  date: Date | null;
  tasks: Task[];
}
