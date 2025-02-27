import { TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';

export type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
  onEditModeChange?: (EditMode: boolean) => void;
  style?: React.CSSProperties;
};

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState('');

  const onChangeTitleHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),
    []
  );

  const activatedEditMode = useCallback(() => {
    setEditMode(true);
    props.onEditModeChange?.(true);
    setTitle(props.title);
  }, [props.title, props.onEditModeChange]);

  const activateViewMode = useCallback(() => {
    setEditMode(false);
    props.onEditModeChange?.(false);
    props.onChange(title);
  }, [props.onChange, props.onEditModeChange, title]);

  const onKeyDownHendler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setEditMode(false);
        props.onEditModeChange?.(false);
        props.onChange(title);
      }
    },
    [props.onChange, props.onEditModeChange, title]
  );

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
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  );
});
export default EditableSpan;
