import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  todoListId1,
  todoListId2,
} from './todoList-reducer';

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

export type ChangeTaskSTitleType = {
  type: 'CHANGE-TASK-TITLE';
  todoListId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaksActionType
  | ChangeTaskStatusType
  | ChangeTaskSTitleType
  | RemoveTodolistActionType
  | AddTodolistActionType;

const initialState: TasksStateType = {
  [todoListId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJs', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todoListId2]: [
    { id: v1(), title: 'Book', isDone: false },
    { id: v1(), title: 'Milk', isDone: false },
  ],
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
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
        [action.todoListId]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todoListId],
        ],
      };
    }

    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId
            ? { ...task, isDone: action.isDone } // Створюємо новий об'єкт задачі
            : task
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

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskSTitleType => {
  return { type: 'CHANGE-TASK-TITLE', todoListId, taskId, title };
};
