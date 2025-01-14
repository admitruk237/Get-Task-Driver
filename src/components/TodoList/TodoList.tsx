import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter('All', props.id);

  const onActiveClickHandler = () => props.changeFilter('Active', props.id);

  const onCompletedClickHandler = () =>
    props.changeFilter('Completed', props.id);
  const deleteTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

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
        {props.tasks.map((task) => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };
          return (
            <li className={task.isDone ? styles.isDone : ''} key={task.id}>
              <label className={styles.label}>
                <Checkbox
                  onChange={onChangeStatusHandler}
                  checked={task.isDone}
                  color={'success'}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                  <Delete />
                </IconButton>
              </label>
            </li>
          );
        })}
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
}
