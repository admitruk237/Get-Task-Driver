import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';
import { VALIDATION_MESSAGES } from '../../utils/constants';

type Props = {
  addItem: (title: string) => void;
  style?: React.CSSProperties;
};

const AddItemForm = (props: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const handleAddItem = () => {
    const trimmedTitle = newTaskTitle.trim();

    if (trimmedTitle !== '') {
      props.addItem(trimmedTitle);
      setNewTaskTitle('');
      setError(null);
    } else {
      setError(VALIDATION_MESSAGES.FIELD_REQUIRED);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      handleAddItem();
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
      <TextField
        className={error ? styles.error : ''}
        value={newTaskTitle}
        onChange={handleNewTitleChange}
        onKeyDown={handleKeyDown}
        label="Title"
        variant="filled"
        error={!!error}
        helperText={error}
        aria-label="Add new item title"
        aria-invalid={!!error}
        sx={{ flexGrow: 1, marginRight: '12px' }}
      />
      <IconButton
        sx={{
          padding: '0 20px 0 0',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleAddItem}
        color="primary"
        aria-label="Add item"
        disableRipple
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
};

export default AddItemForm;
