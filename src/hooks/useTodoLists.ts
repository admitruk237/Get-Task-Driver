import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { fetchTodoList } from '../servies/todoListService';
import {
  setTodoListsAC,
  addTodoListAC,
  removeTodoListAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from '../state/todoList-reducer';
import { setErrorAC, setErrorMessageDeleteAC } from '../state/error-reducer';
import { setTasksAC } from '../state/tasksState/taskActionCreators';
import { FilteredValuesType, ResponseTypeTodo } from '../types/todo.interface';
import { ERROR_DISPLAY_DURATION } from '../utils/constants';

export const useTodoList = () => {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, ResponseTypeTodo[]>(
    (state) => state.todoList || []
  );
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.error.error
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchData = async () => {
      try {
        const todolists = await fetchTodoList();
        dispatch(setTodoListsAC(todolists));

        todolists.forEach((todo) => {
          dispatch(setTasksAC(todo.tasks, todo.id));
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        dispatch(setErrorAC(errorMessage));

        timeoutId = setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, ERROR_DISPLAY_DURATION);
      }
    };

    fetchData();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch]);

  const addTodo = (title: string) => {
    const formattedTodo: ResponseTypeTodo = {
      id: crypto.randomUUID(),
      title,
      filter: 'All' as FilteredValuesType,
      createdAt: new Date().toISOString(),
      userId: 'userId',
      tasks: [],
    };
    dispatch(addTodoListAC(formattedTodo));
  };

  const changeTodolistFilter = (
    value: FilteredValuesType,
    todoListId: string
  ) => {
    dispatch(changeTodolistFilterAC(todoListId, value));
  };

  const removeTodoList = (id: string) => {
    dispatch(removeTodoListAC(id));
  };

  const changeTodolistTitle = (todoId: string, newTodoTitle: string) => {
    dispatch(changeTodolistTitleAC(todoId, newTodoTitle));
  };

  return {
    todolists,
    error,
    addTodo,
    changeTodolistFilter,
    removeTodoList,
    changeTodolistTitle,
  };
};
