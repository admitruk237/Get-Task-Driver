import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todoList-reducer';
import { TaskType } from '../api/taskListApi';

export type SetTaskActionType = {
  type: 'SET-TASKS';
  tasks: TaskType[];
  todoListId: string;
};

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todoListId: string;
  taskId: string;
};

export type AddTaksActionType = {
  type: 'ADD-TASK';
  task: TaskType;
  todoListId: string;
};

export type ChangeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  todoListId: string;
  taskId: string;
  status: boolean;
};

export type ChangeTaskSTitleType = {
  type: 'CHANGE-TASK-TITLE';
  todoListId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | SetTaskActionType
  | RemoveTaskActionType
  | AddTaksActionType
  | ChangeTaskStatusType
  | ChangeTaskSTitleType
  | RemoveTodolistActionType
  | AddTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      return { ...state, [action.todoListId]: action.tasks };
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.todoListId]: [action.task, ...state[action.todoListId]],
      };
    }

    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task
        ),
      };
    }

    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    }

    case 'ADD-TODOLIST': {
      let copyState = { ...state };
      copyState[action.id] = [];
      return copyState;
    }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

export const setTasksAC = (
  tasks: TaskType[],
  todoListId: string
): SetTaskActionType => {
  return { type: 'SET-TASKS', tasks, todoListId } as const;
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todoListId, taskId };
};
export const addTaskAC = (
  todoListId: string,
  task: TaskType
): AddTaksActionType => {
  return { type: 'ADD-TASK', task, todoListId: todoListId };
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  status: boolean
): ChangeTaskStatusType => {
  return { type: 'CHANGE-TASK-STATUS', todoListId, taskId, status };
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskSTitleType => {
  return { type: 'CHANGE-TASK-TITLE', todoListId, taskId, title };
};
