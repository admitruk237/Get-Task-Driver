import React, { ChangeEvent, useCallback } from 'react';
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
    state.tasks[todoListId]?.find((t) => t.id === taskId)
  );

  const onRemoveHandler = useCallback(() => {
    if (task) {
      dispatch(removeTaskAC(task.id, todoListId));
    }
  }, [dispatch, task, todoListId]);

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (task) {
        dispatch(
          changeTaskStatusAC(todoListId, task.id, e.currentTarget.checked)
        );
      }
    },
    [dispatch, task, todoListId]
  );

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      if (task) {
        dispatch(changeTaskTitleAC(todoListId, task.id, newValue));
      }
    },
    [dispatch, task, todoListId]
  );

  if (!task) {
    return <div>Task not found</div>;
  }

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
