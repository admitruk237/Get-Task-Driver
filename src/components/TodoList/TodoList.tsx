import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../App';

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
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState(' ');
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle, props.id);
        setNewTaskTitle('');
      } else {
        setError('Field is required');
      }
    }
  };

  const onAddTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle('');
    } else {
      setError('Field is required');
    }
  };

  const onAllClickHandler = () => props.changeFilter('All', props.id);

  const onActiveClickHandler = () => props.changeFilter('Active', props.id);

  const onCompletedClickHandler = () =>
    props.changeFilter('Completed', props.id);
  const deleteTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h3>
        {props.title} <button onClick={deleteTodoListHandler}>X</button>
      </h3>
      <div>
        <input
          className={error ? styles.error : ''}
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHendler}
          type="text"
        />
        <button onClick={onAddTaskHandler}>+</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          return (
            <li className={task.isDone ? styles.isDone : ''} key={task.id}>
              <label className={styles.label}>
                <input
                  onChange={onChangeStatusHandler}
                  type="checkbox"
                  checked={task.isDone}
                />
                <span>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </label>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'All' ? styles.activeFilter : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'Active' ? styles.activeFilter : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'Completed' ? styles.activeFilter : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
