import styles from './styles.module.css';
import { FilteredValuesType, TaskType } from '../../types/todo.interface';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Task } from '../Task/Task';
import { formatDateTime } from '../../utils/dateUtils';
import { useTodoListHandler } from '../../hooks/useTodoListHandler';
import { useColorMode } from '../ColorModeContext/ColorModeContext';
import { useEffect, useRef, useState } from 'react';

type PropsType = {
  id: string;
  title: string;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
  addedDate: string;
};

export const TodoList = (props: PropsType) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const {
    tasks,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    deleteTodoListHandler,
    changeTodoListTitle,
    addTask,
    onRemoveHandler,
    onChangeStatusHandler,
    onChangeTitleHandler,
    serveDate,
  } = useTodoListHandler(
    props.id,
    props.changeFilter,
    props.removeTodoList,
    props.addedDate,
    props.filter
  );

  useEffect(() => {
    const ulElement = ulRef.current;
    if (!ulElement) return;

    const observer = new ResizeObserver(() => {
      const height = ulElement.scrollHeight;
      setIsOverflowing(height > 219);
    });

    observer.observe(ulElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const { mode } = useColorMode();

  return (
    <div className={styles.todolistContainer}>
      <h3 style={{ padding: '0 10px' }}>
        <EditableSpan
          title={props.title}
          onChange={(newTitle) => changeTodoListTitle(props.id, newTitle)}
        />{' '}
        <IconButton aria-label="delete" onClick={deleteTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <p style={{ marginTop: '-20px', fontSize: '12px', padding: '0 10px' }}>
        {serveDate ? formatDateTime(serveDate.toString()) : ''}
      </p>

      <AddItemForm
        style={{
          padding: '0 10px 15px 10px',
          width: '100%',
        }}
        addItem={addTask}
      />

      <div
        className={styles.darkScrollbar}
        style={{
          padding: '0 10px 20px 10px',
          listStyle: 'none',
          overflowY: isOverflowing ? 'auto' : 'hidden',
        }}
      >
        <ul className={styles.list} ref={ulRef}>
          {tasks.map(
            (task: TaskType) =>
              task && (
                <Task
                  task={task}
                  key={task.id}
                  todoListId={props.id}
                  removeTask={onRemoveHandler}
                  changeTaskStatus={onChangeStatusHandler}
                  changeTaskTitle={onChangeTitleHandler}
                  deadline={task.endDate ? new Date(task.endDate) : null}
                  priority={task.priority}
                />
              )
          )}
        </ul>
      </div>
      <div style={{ padding: '10px' }}>
        <Button
          color={'primary'}
          variant={props.filter === 'All' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.filter === 'Active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.filter === 'Completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
