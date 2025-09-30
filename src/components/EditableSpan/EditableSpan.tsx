import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type Props = {
  title: string;
  onChange: (value: string) => void;
  onEditModeChange?: (EditMode: boolean) => void;
  style?: React.CSSProperties;
};

const EditableSpan = ({
  title: initialTitle,
  onChange,
  onEditModeChange,
  style,
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleActivateEditMode = () => {
    setEditMode(true);
    onEditModeChange?.(true);
    setTitle(initialTitle);
  };

  const handleActivateViewMode = () => {
    setEditMode(false);
    onEditModeChange?.(false);
    onChange(title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleActivateViewMode();
    }
  };

  return editMode ? (
    <TextField
      variant="standard"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleActivateViewMode}
      autoFocus
      onKeyDown={handleKeyDown}
      style={style}
    />
  ) : (
    <span className="Task-span" onDoubleClick={handleActivateEditMode}>
      {initialTitle}
    </span>
  );
};

export default EditableSpan;
