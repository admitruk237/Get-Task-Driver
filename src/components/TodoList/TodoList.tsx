import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FilteredValuesType } from '../../AppWithRedux';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { AppRootStateType } from '../../state/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
} from '../../state/tasks-reducer';
import { taskListApi, TaskType } from '../../api/taskListApi';

type PropsType = {
  id: string;
  title: string;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeFilter: (value: FilteredValuesType, todoListId: string) => void;
  filter: FilteredValuesType;
  removeTodoList: (todoListId: string) => void;
  addedDate: string;
  order: number;
};

export const TodoList = React.memo((props: PropsType) => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskListApi.getTaskLists(props.id);
        dispatch(setTasksAC(response.data.items, props.id));
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, [dispatch, props.id]);

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id] || []
  );

  console.log(tasks);

  const onAllClickHandler = useCallback(
    () => props.changeFilter('All', props.id),
    [props.changeFilter, props.id]
  );

  const onActiveClickHandler = useCallback(
    () => props.changeFilter('Active', props.id),
    [props.changeFilter, props.id]
  );

  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('Completed', props.id),
    [props.changeFilter, props.id]
  );
  const deleteTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = useCallback(
    async (taskId: string, newTitle: string) => {
      try {
        await taskListApi.updateTask(props.id, taskId, newTitle); // Виклик API для ToDo List
        props.changeTodoListTitle(props.id, newTitle); // Оновлення в Redux або локальному стані
      } catch (error: any) {
        setError(error.message);
      }
    },
    [props.id, props.changeTodoListTitle]
  );

  const addTask = useCallback(
    async (title: string) => {
      const newTask = {
        id: '4',
        title: title,
        completed: false,
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
      }; // "temp-id" - це тимчасовий ідентифікатор, якщо API не повертає id одразу.
      dispatch(addTaskAC(props.id, newTask));
      try {
        const response = await taskListApi.createTask(props.id, title);
        //console.log('API Response:', response); // Додаємо логування

        dispatch(addTaskAC(props.id, response.data.item));
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch, props.id]
  );

  let taskForTodoList = tasks;

  if (props.filter === 'Completed') {
    taskForTodoList = taskForTodoList.filter((t) => t.completed === true);
  }

  if (props.filter === 'Active') {
    taskForTodoList = taskForTodoList.filter((t) => t.completed === false);
  }

  const onRemoveHandler = useCallback(
    (taskId: string, todoListId: string) => {
      dispatch(removeTaskAC(taskId, todoListId));
    },
    [dispatch, props.id]
  );
  const onChangeStatusHandler = useCallback(
    async (
      todoListId: string,
      taskId: string,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      try {
        await taskListApi.changeTaskStatus(
          todoListId,
          taskId,
          e.currentTarget.checked
        );
        dispatch(
          changeTaskStatusAC(todoListId, taskId, e.currentTarget.checked)
        );
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch]
  );
  const onChangeTitleHandler = useCallback(
    async (todoListId: string, taskId: string, newValue: string) => {
      try {
        await taskListApi.updateTask(todoListId, taskId, newValue);
        dispatch(changeTaskTitleAC(todoListId, taskId, newValue));
      } catch (error: any) {
        setError(error.message);
      }
    },
    [dispatch, props.id]
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
      <AddItemForm addItem={addTask} />
      <ul className={styles.noDots}>
        {taskForTodoList?.map((task) =>
          task && task.id ? (
            <Task
              task={task}
              key={task.id}
              todoListId={props.id}
              removeTask={onRemoveHandler}
              changeTaskStatus={onChangeStatusHandler}
              changeTaskTitle={onChangeTitleHandler}
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
});
