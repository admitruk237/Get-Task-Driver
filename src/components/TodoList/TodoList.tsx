import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../AppWithRedux';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { AppRootStateType } from '../../state/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/tasks-reducer';
import { taskListApi, TaskType } from '../../api/taskListApi';
import { title } from 'process';

type PropsType = {
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
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskListApi.getTaskLists(props.id);
      } catch (error: any) {
        setError(error.message);
      }
    };
  }, [dispatch]);

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id] || []
  );

  const task = tasks.find((t) => t.id === props.id);

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
    async (newTitle: string) => {
      try {
        await taskListApi.updateTask(props.id, task?.id || '', newTitle);
        props.changeTodoListTitle(props.id, newTitle);
      } catch (error: any) {
        setError(error.message);
      }
    },
    [props.id, props.changeTodoListTitle, task]
  );

  const addTask = useCallback(
    async (title: string) => {
      try {
        const response = await taskListApi.createTask(props.id, title);
        dispatch(addTaskAC(title, props.id));
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch, props.id]
  );

  let taskForTodoList = tasks;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.completed === true);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.completed === false);
  }

  const onRemoveHandler = useCallback(
    (taskId: string, todoListId: string) => {
      dispatch(removeTaskAC(taskId, todoListId));
    },
    [dispatch, task, props.id]
  );
  const onChangeStatusHandler = useCallback(
    async (
      todoListId: string,
      taskId: string,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      try {
        await taskListApi.changeTaskStatus(
          todoListId,
          taskId,
          e.currentTarget.checked
        );
        dispatch(
          changeTaskStatusAC(todoListId, taskId, e.currentTarget.checked)
        );
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch]
  );
  const onChangeTitleHandler = useCallback(
    async (todoListId: string, taskId: string, newValue: string) => {
      try {
        await taskListApi.updateTask(todoListId, taskId, newValue);
        dispatch(changeTaskTitleAC(todoListId, taskId, newValue));
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch, task, props.id]
  );

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />{' '}
        <IconButton aria-label="delete" onClick={deleteTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul className={styles.noDots}>
        {taskForTodoList.map((task) => (
          <Task
            task={task}
            key={task.id}
            todoListId={props.id}
            removeTask={onRemoveHandler}
            changeTaskStatus={onChangeStatusHandler}
            changeTaskTitle={onChangeTitleHandler}
          />
        ))}
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
