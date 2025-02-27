import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditableSpan from '../EditableSpan/EditableSpan';
import { TaskType } from '../../api/taskListApi';
import LongMenu from '../LongMenu/LongMenu';
import DeadlineIcon from '../DeadlineIcon/DeadlineIcon';

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
  deadline?: string;
  priority: number;
};

export type FilteredPriorityType = 0 | 1 | 2;

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
          boxShadow: `0 0 5px 0 ${props.priority === 0 || props.priority === undefined ? 'green' : props.priority === 1 ? 'yellow' : 'red'}`,
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
          {props.deadline && <DeadlineIcon deadline={props.deadline} />}

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
