import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../AppWithRedux';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
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

export function TodoList(props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );

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
    dispatch(addTaskAC(props.id, title));
  };

  let taskForTodoList = tasks;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
  }

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
        {taskForTodoList.map((task) => {
          const onRemoveHandler = () =>
            dispatch(removeTaskAC(task.id, props.id));
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(
              changeTaskStatusAC(props.id, task.id, e.currentTarget.checked)
            );
          };
          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(props.id, task.id, newValue));
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
