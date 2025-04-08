import { TasksStateType } from '../../types/todo.interface';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from '../todoList-reducer';
import { TaskType } from '../../types/todo.interface';
import { TaskActionType } from './taskActionCreators';

export type SetTaskActionType = {
  type: TaskActionType.SET_TASKS;
  tasks: TaskType[];
  todoListId: string;
};

export type RemoveTaskActionType = {
  type: TaskActionType.REMOVE_TASK;
  taskId: number;
  todoListId: string;
};

export type AddTaksActionType = {
  type: TaskActionType.ADD_TASK;
  task: TaskType;
  todoListId: string;
};

export type ChangeTaskStatusType = {
  type: TaskActionType.CHANGE_TASK_STATUS;
  todoListId: string;
  taskId: number;
  completed: boolean;
};

export type ChangeTaskSTitleType = {
  type: TaskActionType.CHANGE_TASK_TITLE;
  todoListId: string;
  taskId: number;
  title: string;
};

export type ChangeTaskPriorityType = {
  type: TaskActionType.CHANGE_TASK_PRIORITY;
  todoListId: string;
  taskId: number;
  priority: string;
};

export type ChangeTaskDeadlineType = {
  type: TaskActionType.CHANGE_TASK_DEADLINE;
  todoListId: string;
  taskId: number;
  endDate: string;
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
      return {
        ...state,
        [action.todoListId]: action.tasks,
      };
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
        [action.todoListId]: [...(state[action.todoListId] || []), action.task],
      };

      return newState;
    }

    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId
            ? { ...task, completed: action.completed }
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

    case 'CHANGE-TASK-DEADLINE': {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((task) =>
          task.id === action.taskId
            ? { ...task, endDate: action.endDate }
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

    default:
      return state;
  }
};
