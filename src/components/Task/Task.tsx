import { ChangeEvent, useState } from 'react';
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

export const Task = (props: TaskPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const onEditModeChange = (EditMode: boolean) => {
    setIsEditMode(EditMode);
  };

  const onRemoveHandler = () => {
    props.removeTask(props.task.id, props.todoListId);
  };

  return (
    <div style={{ position: 'relative' }}>
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: `2px solid ${props.priority === 'Low' || props.priority === undefined ? 'green' : props.priority === 'Medium' ? 'yellow' : 'red'}`,
        }}
        className={props.task.status ? styles.isDone : styles.taskContainer}
      >
        <label className={styles.label}>
          <Checkbox
            size="small"
            className={styles.checkbox}
            sx={
              hover
                ? { width: '40px', padding: '0 5px', opacity: 1 }
                : { width: 0, padding: 0, opacity: 0 }
            }
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
          />
        </label>

        <div
          style={
            hover
              ? {
                  height: '30px',
                  textAlign: 'right',
                  opacity: 1,
                  paddingRight: '5px',
                  transition: 'all 0.5s',
                }
              : { textAlign: 'right', height: 0, opacity: 0 }
          }
        >
          {props.deadline && (
            <DeadlineIcon deadline={props.deadline.toISOString()} />
          )}

          <IconButton
            size="small"
            aria-label="delete"
            onClick={onRemoveHandler}
          >
            <Delete />
          </IconButton>
        </div>
      </li>
      <LongMenu
        priority={props.priority}
        taskId={props.task.id}
        todoListId={props.todoListId}
      />
    </div>
  );
};
