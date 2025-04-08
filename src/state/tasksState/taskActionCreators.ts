import { TaskType } from '../../types/todo.interface';
import {
  AddTaksActionType,
  ChangeTaskDeadlineType,
  ChangeTaskPriorityType,
  ChangeTaskStatusType,
  ChangeTaskSTitleType,
  RemoveTaskActionType,
  SetTaskActionType,
} from './tasks-reducer';

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

export const setTasksAC = (
  tasks: TaskType[],
  todoListId: string
): SetTaskActionType => {
  return { type: TaskActionType.SET_TASKS, tasks, todoListId } as const;
};

export const removeTaskAC = (
  taskId: number,
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
  taskId: number,
  status: boolean
): ChangeTaskStatusType => {
  return {
    type: TaskActionType.CHANGE_TASK_STATUS,
    todoListId,
    taskId,
    completed: status,
  };
};

export const changeTaskDeadlineAC = (
  todoListId: string,
  taskId: number,
  endDate: string
): ChangeTaskDeadlineType => {
  return {
    type: TaskActionType.CHANGE_TASK_DEADLINE,
    todoListId,
    taskId,
    endDate,
  };
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: number,
  title: string
): ChangeTaskSTitleType => {
  return { type: TaskActionType.CHANGE_TASK_TITLE, todoListId, taskId, title };
};

export const changeTaskPriorityAC = (
  todoListId: string,
  taskId: number,
  priority: string
): ChangeTaskPriorityType => {
  return {
    type: TaskActionType.CHANGE_TASK_PRIORITY,
    todoListId,
    taskId,
    priority,
  };
};
