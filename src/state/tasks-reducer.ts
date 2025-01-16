import { FilteredValuesType, TasksStateType } from '../App';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todoListId: string;
  taskId: string;
};

export type AddTaksActionType = {
  type: 'ADD-TASK';
  title: string;
  todoListId: string;
};

export type ChangeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  todoListId: string;
  taskId: string;
  isDone: boolean;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaksActionType
  | ChangeTaskStatusType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let copyState = { ...state };
      let task = copyState[action.todoListId];

      let filterredtTask = task.filter((t) => t.id !== action.taskId);
      copyState[action.todoListId] = filterredtTask;

      return copyState;
    }
    case 'ADD-TASK': {
      let copyState = { ...state };
      let newTask = { id: '4', title: action.title, isDone: false };
      let task = copyState[action.todoListId];
      let newTasks = [newTask, ...task];
      copyState[action.todoListId] = newTasks;

      return copyState;
    }

    case 'CHANGE-TASK-STATUS': {
      let copyState = { ...state };
      let tasks = copyState[action.todoListId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return copyState;
    }

    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todoListId, taskId };
};

export const addTaskAC = (
  todoListId: string,
  newTodoListTitle: string
): AddTaksActionType => {
  return { type: 'ADD-TASK', title: newTodoListTitle, todoListId: todoListId };
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusType => {
  return { type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone };
};
