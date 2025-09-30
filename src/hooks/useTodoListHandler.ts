import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { taskApi } from '../api/taskApi';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../state/tasksState/taskActionCreators';
import { changeTodolistTitleAC } from '../state/todoList-reducer';
import { FilteredValuesType, TaskType } from '../types/todo.interface';
import { handleError } from '../utils/errorHandler';

export const useTodoListHandler = (
  id: string,
  changeFilter: (value: FilteredValuesType, todoId: string) => void,
  removeTodoList: (todoId: string) => void,
  addedDate: string,
  filter: FilteredValuesType
) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id] || []
  );

  const onAllClickHandler = () => changeFilter('All', id);
  const onActiveClickHandler = () => changeFilter('Active', id);
  const onCompletedClickHandler = () => changeFilter('Completed', id);

  const deleteTodoListHandler = () => {
    removeTodoList(id);
  };

  const changeTodoListTitle = (todoId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todoId, newTitle));
  };

  const addTask = (title: string) => {
    const now = new Date();
    const newTask = {
      date: '',
      id: 0,
      title: title,
      description: '',
      endDate: '',
      completed: true,
      priority: 'Medium',
      todoId: id,
      order: 0,
      status: 'All',
      userId: '',
    };
    dispatch(addTaskAC(id, newTask));
  };

  let taskForTodoList = tasks || [];
  const serveDate = addedDate;

  if (filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.status);
  }

  if (filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => !t.status);
  }

  const onRemoveHandler = async (taskId: number, todoListId: string) => {
    try {
      await taskApi.deleteTask(taskId);
      dispatch(removeTaskAC(taskId, todoListId));
    } catch (error) {
      handleError(dispatch, error);
    }
  };

  const onChangeStatusHandler = (
    todoListId: string,
    taskId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const currentTask = tasks?.find((task) => task.id === taskId);
    if (!currentTask) return;

    const updateTask = {
      ...currentTask,
      status: e.currentTarget.checked,
    };

    dispatch(changeTaskStatusAC(todoListId, taskId, updateTask.status));
  };

  const onChangeTitleHandler = async (
    todoListId: string,
    taskId: number,
    newValue: string
  ) => {
    try {
      if (newValue.trim() === '') {
        await taskApi.deleteTask(taskId);
        dispatch(removeTaskAC(taskId, todoListId));
      } else {
        dispatch(changeTaskTitleAC(todoListId, taskId, newValue));
      }
    } catch (error) {
      handleError(dispatch, error);
    }
  };

  return {
    tasks: taskForTodoList,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    deleteTodoListHandler,
    changeTodoListTitle,
    addTask,
    onRemoveHandler,
    onChangeStatusHandler,
    onChangeTitleHandler,
    serveDate,
  };
};
