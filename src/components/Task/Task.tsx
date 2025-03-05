import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditableSpan from '../EditableSpan/EditableSpan';

import LongMenu from '../LongMenu/LongMenu';
import DeadlineIcon from '../DeadlineIcon/DeadlineIcon';
import { TaskType } from '../../types/todo.interface';

export type TaskPropsType = {
  todoListId: string;
  removeTask: (taskId: number, todoListId: string) => void;
  changeTaskStatus: (
    todoListId: string,
    taskId: number,
    value: ChangeEvent<HTMLInputElement>
  ) => void;
  changeTaskTitle: (
    todoListId: string,
    taskId: number,
    newValue: string
  ) => void;
  task: TaskType;
  deadline: Date | null;
  priority: string;
};

export type FilteredPriorityType = 'Low' | 'Medium' | 'Hight';

export const Task = React.memo((props: TaskPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onEditModeChange = (EditMode: boolean) => {
    setIsEditMode(EditMode);
  };

  const onRemoveHandler = () => {
    props.removeTask(props.task.id, props.todoListId);
  };

  return (
    <div>
      <li
        style={{
          boxShadow: `0 0 5px 0 ${props.priority === 'Low' || props.priority === undefined ? 'green' : props.priority === 'Medium' ? 'yellow' : 'red'}`,
        }}
        className={props.task.status ? styles.isDone : styles.taskContainer}
      >
        <label className={styles.label}>
          <Checkbox
            onChange={(e) =>
              props.changeTaskStatus(props.todoListId, props.task.id, e)
            }
            checked={!!props.task.status}
            color="success"
          />
          <EditableSpan
            onEditModeChange={onEditModeChange}
            title={props.task.title}
            onChange={(value) =>
              props.changeTaskTitle(props.todoListId, props.task.id, value)
            }
            style={{ width: '100%' }}
          />
        </label>

        <div style={{ display: isEditMode ? 'none' : 'flex' }}>
          {props.deadline && (
            <DeadlineIcon deadline={props.deadline.toISOString()} />
          )}

          <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete />
          </IconButton>
          <LongMenu
            priority={props.priority}
            taskId={props.task.id}
            todoListId={props.todoListId}
          />
        </div>
      </li>
    </div>
  );
});
