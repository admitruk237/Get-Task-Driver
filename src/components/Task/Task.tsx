import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import EditableSpan from '../EditableSpan/EditableSpan';
import { TaskType } from '../TodoList/TodoList';

export type TaskPropsType = {
  todoListId: string;
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskStatus: (
    todoListId: string,
    taskId: string,
    value: ChangeEvent<HTMLInputElement>
  ) => void;
  changeTaskTitle: (
    todoListId: string,
    taskId: string,
    newValue: string
  ) => void;
  task: TaskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = () => {
    props.removeTask(props.task.id, props.todoListId);
  };

  return (
    <li className={props.task.isDone ? styles.isDone : ''}>
      <label className={styles.label}>
        <Checkbox
          onChange={(e) =>
            props.changeTaskStatus(props.todoListId, props.task.id, e)
          }
          checked={props.task.isDone}
          color="success"
        />
        <EditableSpan
          title={props.task.title}
          onChange={(value) =>
            props.changeTaskTitle(props.todoListId, props.task.id, value)
          }
        />
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
          <Delete />
        </IconButton>
      </label>
    </li>
  );
});
