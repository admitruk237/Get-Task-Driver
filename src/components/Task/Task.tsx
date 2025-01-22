import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/tasks-reducer';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import styles from './styles.module.css';

import EditableSpan from '../EditableSpan/EditableSpan';

export type TaskPropsType = {
  taskId: string;
  todoListId: string;
};

export const Task = React.memo(({ taskId, todoListId }: TaskPropsType) => {
  const dispatch = useDispatch();

  const task = useSelector((state: AppRootStateType) =>
    state.tasks[todoListId].find((t) => t.id === taskId)
  );

  if (!task) return null;

  const onRemoveHandler = () => dispatch(removeTaskAC(task.id, todoListId));
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todoListId, task.id, e.currentTarget.checked));
  };
  const onChangeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(todoListId, task.id, newValue));
  };

  return (
    <li className={task.isDone ? styles.isDone : ''}>
      <label className={styles.label}>
        <Checkbox
          onChange={onChangeStatusHandler}
          checked={task.isDone}
          color="success"
        />
        <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
          <Delete />
        </IconButton>
      </label>
    </li>
  );
});
