import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../AppWithRedux';
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
} from '../../state/tasks-reducer';
import { taskListApi, TaskType } from '../../api/taskListApi';
import { v1 } from 'uuid';
import { formatDateTime } from '../../utils/dateUtils';
import { shallowEqual } from 'react-redux';

type PropsType = {
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  errorMessage: string | null;
  id: string;
  title: string;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
  addedDate: string;
  order: number;
};

export const TodoList = React.memo((props: PropsType) => {
  const { errorMessage, setErrorMessage } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskListApi.getTaskLists(props.id);
        dispatch(setTasksAC(response.data.items, props.id));
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, [dispatch, props.id]);

  const tasks = useSelector(
    (state: AppRootStateType) => state.tasks[props.id] || [],
    shallowEqual
  );

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
    async (taskId: string, newTitle: string) => {
      try {
        await taskListApi.updateTask(props.id, taskId, newTitle); // Виклик API для ToDo List
        props.changeTodoListTitle(props.id, newTitle); // Оновлення в Redux або локальному стані
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    },
    [props.id, props.changeTodoListTitle]
  );

  const addTask = useCallback(
    async (title: string) => {
      const newTask = {
        id: v1(),
        title,
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId: props.id, // ✅ Оновлено
        order: 0,
        addedDate: '',
      };

      dispatch(addTaskAC(props.id, newTask));

      try {
        const response = await taskListApi.createTask(props.id, title);

        dispatch(addTaskAC(props.id, response.data.item));
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    },
    [dispatch, props.id]
  );

  let taskForTodoList = tasks;

  const serveDate = props.addedDate;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.status === 1);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.status === 0);
  }

  const onRemoveHandler = useCallback(
    async (taskId: string, todolistId: string) => {
      try {
        await taskListApi.deleteTask(todolistId, taskId);
        dispatch(removeTaskAC(taskId, todolistId));
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    },
    [dispatch]
  );

  const onChangeStatusHandler = useCallback(
    async (
      todoListId: string,
      taskId: string,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      try {
        const currentTask = tasks.find((task) => task.id === taskId);
        if (!currentTask) return;

        const updateTask = {
          ...currentTask,
          status: e.currentTarget.checked ? 1 : 0,
        };

        await taskListApi.changeTaskStatus(todoListId, taskId, updateTask);

        dispatch(changeTaskStatusAC(todoListId, taskId, updateTask.status));
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    },
    [dispatch, tasks]
  );

  const onChangeTitleHandler = useCallback(
    async (todoListId: string, taskId: string, newValue: string) => {
      try {
        await taskListApi.updateTask(todoListId, taskId, newValue);
        dispatch(changeTaskTitleAC(todoListId, taskId, newValue));
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    },
    [dispatch, props.id]
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
        {formatDateTime(serveDate)}
      </p>

      <AddItemForm addItem={addTask} />
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
