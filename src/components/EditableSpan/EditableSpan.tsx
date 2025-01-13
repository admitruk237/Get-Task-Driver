import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState('');

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const activatedEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onKeyDownHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      props.onChange(title);
    }
  };

  return editMode ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
      onKeyDown={onKeyDownHendler}
    />
  ) : (
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  );
}
export default EditableSpan;
