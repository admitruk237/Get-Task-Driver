import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';
import { Button, IconButton, TextField } from '@mui/material';
import {
  AddCircleOutlineOutlined,
  AddSharp,
  AddTask,
  ControlPoint,
} from '@mui/icons-material';

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
      <TextField
        className={error ? styles.error : ''}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHendler}
        label={'Type value'}
        variant="outlined"
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={onAddTaskHandler} color={'primary'}>
        <ControlPoint />
      </IconButton>
    </div>
  );
}

export default AddItemForm;
