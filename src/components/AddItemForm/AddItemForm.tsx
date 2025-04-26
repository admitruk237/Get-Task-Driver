import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  style?: React.CSSProperties;
};
const AddItemForm = (props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ...props.style,
      }}
    >
      {' '}
      <TextField
        className={error ? styles.error : ''}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHendler}
        label={'Title'}
        variant="filled"
        error={!!error}
        helperText={error}
        sx={{ flexGrow: 1, marginRight: '12px' }}
      />{' '}
      <IconButton
        sx={{ padding: '0 20px 0 0' }}
        onClick={onAddTaskHandler}
        color={'primary'}
      >
        <ControlPoint />{' '}
      </IconButton>{' '}
    </div>
  );
};

export default AddItemForm;
