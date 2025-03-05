import React, { ChangeEvent, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../types/todo.interface';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { AppRootStateType } from '../../state/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
} from '../../state/tasksState/taskActionCreators';
import { taskApi } from '../../api/taskApi';

import { formatDateTime } from '../../utils/dateUtils';

import { setErrorAC, setErrorMessageDeleteAC } from '../../state/error-reducer';
import {
  changeTodolistTitleAC,
  setTodoListsAC,
} from '../../state/todoList-reducer';
import { fetchTodoList } from '../../servies/todoListService';

type PropsType = {
  id: string;
  title: string;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
  addedDate: string;
};

export const TodoList = React.memo((props: PropsType) => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: AppRootStateType) => state.tasks[props.id]);

  const onAllClickHandler = useCallback(
    () => props.changeFilter('All', props.id),
    [props.changeFilter, props.id]
  );

  const onActiveClickHandler = useCallback(
    () => props.changeFilter('Active', props.id),
    [props.changeFilter, props.id]
  );

  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('Completed', props.id),
    [props.changeFilter, props.id]
  );
  const deleteTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = useCallback(
    (todoId: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todoId, newTitle));
    },
    [props.id, props.changeTodoListTitle]
  );

  const addTask = useCallback(
    async (title: string) => {
      try {
        const response = await taskApi.createTask({
          date: new Date('2025-03-12T13:21:55.344Z'),
          id: 0,
          title: title,
          description: '',
          endDate: new Date().toISOString(),
          completed: false,
          priority: 'Medium',
          todoId: props.id,
          order: 0,
          status: '',
          userId: '',
        });

        dispatch(addTaskAC(props.id, response.data.item));
      } catch (error: any) {
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
      }
    },
    [dispatch, props.id]
  );

  let taskForTodoList = tasks;

  const serveDate = props.addedDate;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.status);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.status);
  }

  const onRemoveHandler = useCallback(
    async (taskId: number, todoListId: string) => {
      try {
        await taskApi.deleteTask(taskId);
        dispatch(removeTaskAC(taskId, todoListId));
      } catch (error: any) {
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
      }
    },
    [dispatch]
  );

  const onChangeStatusHandler = useCallback(
    (todoListId: string, taskId: number, e: ChangeEvent<HTMLInputElement>) => {
      const currentTask = tasks.find((task) => task.id === taskId);
      if (!currentTask) return;

      const updateTask = {
        ...currentTask,
        status: e.currentTarget.checked ? true : false,
      };

      dispatch(changeTaskStatusAC(todoListId, taskId, updateTask.status));
    },
    [dispatch, tasks]
  );

  const onChangeTitleHandler = useCallback(
    async (todoListId: string, taskId: number, newValue: string) => {
      try {
        if (newValue.trim() === '') {
          await taskApi.deleteTask(taskId);
          dispatch(removeTaskAC(taskId, todoListId));
        } else {
          dispatch(changeTaskTitleAC(todoListId, taskId, newValue));
        }
      } catch (error: any) {
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
      }
    },
    [dispatch]
  );

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={(newTitle) => changeTodoListTitle(props.id, newTitle)}
        />{' '}
        <IconButton aria-label="delete" onClick={deleteTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <p style={{ marginTop: '-20px', fontSize: '12px' }}>
        {serveDate ? formatDateTime(serveDate.toString()) : ''}
      </p>

      <AddItemForm style={{ width: '88%' }} addItem={addTask} />
      <ul className={styles.noDots}>
        {taskForTodoList?.map((task) =>
          task && task.id ? (
            <Task
              task={task}
              key={task.id}
              todoListId={props.id}
              removeTask={onRemoveHandler}
              changeTaskStatus={onChangeStatusHandler}
              changeTaskTitle={onChangeTitleHandler}
              deadline={task.endDate ? new Date(task.endDate) : null}
              priority={task.priority}
            />
          ) : null
        )}
      </ul>
      <div>
        <Button
          color={'inherit'}
          variant={props.filter === 'All' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.filter === 'Active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.filter === 'Completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
