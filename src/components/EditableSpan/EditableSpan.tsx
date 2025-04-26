import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
  onEditModeChange?: (EditMode: boolean) => void;
  style?: React.CSSProperties;
};

const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState('');

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const activatedEditMode = () => {
    setEditMode(true);
    props.onEditModeChange?.(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onEditModeChange?.(false);
    props.onChange(title);
  };

  const onKeyDownHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      props.onEditModeChange?.(false);
      props.onChange(title);
    }
  };

  return editMode ? (
    <TextField
      variant={'standard'}
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
      onKeyDown={onKeyDownHendler}
      style={props.style}
    />
  ) : (
    <span className="Task-span" onDoubleClick={activatedEditMode}>
      {props.title}
    </span>
  );
};
export default EditableSpan;
