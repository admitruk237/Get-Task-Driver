import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState(' ');
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addItem(newTaskTitle);
        setNewTaskTitle('');
      } else {
        setError('Field is required');
      }
    }
  };

  const onAddTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    } else {
      setError('Field is required');
    }
  };

  return (
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
  );
}

export default AddItemForm;
