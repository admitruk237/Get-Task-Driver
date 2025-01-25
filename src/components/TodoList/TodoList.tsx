import React, { ChangeEvent, useCallback } from 'react';
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
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
    (newTitle: string) => {
      props.changeTodoListTitle(props.id, newTitle);
    },
    [props.changeTodoListTitle, props.id]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(props.id, title));
    },
    [dispatch, props.id]
  );

  let taskForTodoList = tasks;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
  }

  const onRemoveHandler = useCallback(
    (taskId: string, todoListId: string) => {
      dispatch(removeTaskAC(taskId, todoListId));
    },
    [dispatch, task, props.id]
  );
  const onChangeStatusHandler = useCallback(
    (todoListId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(todoListId, taskId, e.currentTarget.checked));
    },
    [dispatch]
  );
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      if (task) {
        dispatch(changeTaskTitleAC(props.id, task.id, newValue));
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
