import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todoList-reducer';
import { TaskType } from '../api/taskListApi';

export enum TaskActionType {
  SET_TASKS = 'SET-TASKS',
  REMOVE_TASK = 'REMOVE-TASK',
  ADD_TASK = 'ADD-TASK',
  CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
  CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
  CHANGE_TASK_PRIORITY = 'CHANGE-TASK-PRIORITY',
  CHANGE_TASK_DEADLINE = 'CHANGE-TASK-DEADLINE',
  ADD_TODOLIST = 'ADD-TODOLIST',
}

export type SetTaskActionType = {
  type: TaskActionType.SET_TASKS;
  tasks: TaskType[];
  todoListId: string;
};

export type RemoveTaskActionType = {
  type: TaskActionType.REMOVE_TASK;
  todoListId: string;
  taskId: string;
};

export type AddTaksActionType = {
  type: TaskActionType.ADD_TASK;
  task: TaskType;
  todoListId: string;
};

export type ChangeTaskStatusType = {
  type: TaskActionType.CHANGE_TASK_STATUS;
  todoListId: string;
  taskId: string;
  status: number;
};

export type ChangeTaskSTitleType = {
  type: TaskActionType.CHANGE_TASK_TITLE;
  todoListId: string;
  taskId: string;
  title: string;
};

export type ChangeTaskPriorityType = {
  type: TaskActionType.CHANGE_TASK_PRIORITY;
  todoListId: string;
  taskId: string;
  priority: number;
};

export type ChangeTaskDeadlineType = {
  type: TaskActionType.CHANGE_TASK_DEADLINE;
  todoListId: string;
  taskId: string;
  deadline: string;
};

type ActionsType =
  | SetTaskActionType
  | RemoveTaskActionType
  | AddTaksActionType
  | ChangeTaskStatusType
  | ChangeTaskSTitleType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTaskDeadlineType
  | ChangeTaskPriorityType;

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
      const newState = {
        ...state,
        [action.todoListId]: [action.task, ...(state[action.todoListId] || [])],
      };

      return newState;
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

    case 'CHANGE-TASK-DEADLINE': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId
            ? { ...task, deadline: action.deadline }
            : task
        ),
      };
    }

    case 'CHANGE-TASK-PRIORITY': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId
            ? { ...task, priority: action.priority }
            : task
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
  return { type: TaskActionType.SET_TASKS, tasks, todoListId } as const;
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: TaskActionType.REMOVE_TASK, todoListId, taskId };
};
export const addTaskAC = (
  todoListId: string,
  task: TaskType
): AddTaksActionType => {
  return { type: TaskActionType.ADD_TASK, task, todoListId: todoListId };
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  status: number
): ChangeTaskStatusType => {
  return {
    type: TaskActionType.CHANGE_TASK_STATUS,
    todoListId,
    taskId,
    status,
  };
};

export const changeTaskDeadlineAC = (
  todoListId: string,
  taskId: string,
  deadline: string
): ChangeTaskDeadlineType => {
  return {
    type: TaskActionType.CHANGE_TASK_DEADLINE,
    todoListId,
    taskId,
    deadline,
  };
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskSTitleType => {
  return { type: TaskActionType.CHANGE_TASK_TITLE, todoListId, taskId, title };
};

export const changeTaskPriorityAC = (
  todoListId: string,
  taskId: string,
  priority: number
): ChangeTaskPriorityType => {
  return {
    type: TaskActionType.CHANGE_TASK_PRIORITY,
    todoListId,
    taskId,
    priority,
  };
};
