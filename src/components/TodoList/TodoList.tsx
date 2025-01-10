import React, {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilteredValuesType) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState(' ');

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onAddTaskHandler = () => {
    if (newTaskTitle !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onAllClickHandler = () => props.changeFilter('All');

  const onActiveClickHandler = () => props.changeFilter('Active');

  const onCompletedClickHandler = () => props.changeFilter('Completed');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHendler}
          type="text"
        />
        <button onClick={onAddTaskHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => props.removeTask(task.id);
          return (
            <li key={task.id}>
              <label className={styles.label}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </label>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
