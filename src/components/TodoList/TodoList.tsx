import styles from './styles.module.css';
import { FilteredValuesType, TaskType } from '../../types/todo.interface';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Task } from '../Task/Task';
import { formatDateTime } from '../../utils/dateUtils';
import { useTodoListHandler } from '../../hooks/useTodoListHandler';

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

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={(newTitle) => changeTodoListTitle(props.id, newTitle)}
        />{' '}
        <IconButton aria-label="delete" onClick={deleteTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <p style={{ marginTop: '-20px', fontSize: '12px' }}>
        {serveDate ? formatDateTime(serveDate.toString()) : ''}
      </p>

      <AddItemForm style={{ width: '88%' }} addItem={addTask} />
      <ul className={styles.noDots}>
        {tasks?.map((task: TaskType) =>
          task && task.id ? (
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
          ) : null
        )}
      </ul>
      <div>
        <Button
          color={'inherit'}
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
