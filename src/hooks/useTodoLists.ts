import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { createTodo, fetchTodoList } from '../servies/todoListService';
import {
  setTodoListsAC,
  addTodoListAC,
  removeTodoListAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from '../state/todoList-reducer';
import { setErrorAC, setErrorMessageDeleteAC } from '../state/error-reducer';
import { setTasksAC } from '../state/tasksState/taskActionCreators';
import { FilteredValuesType } from '../types/todo.interface';

export const useTodoList = () => {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<any>>(
    (state) => state.todoList || []
  );
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.error.error
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todolists = await fetchTodoList();
        dispatch(setTodoListsAC(todolists));
        console.log(dispatch(setTodoListsAC(todolists)));

        todolists.forEach((todo) => {
          dispatch(setTasksAC(todo.tasks, todo.id));
          console.log(dispatch(setTasksAC(todo.tasks, todo.id)));
        });
      } catch (error: any) {
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
      }
    };

    fetchData();
  }, [dispatch]);

  const addTodo = async (title: string) => {
    try {
      const newTodoList = await createTodo(title);
      const formattedTodo = {
        id: newTodoList.id,
        title: newTodoList.title,
        filter: newTodoList.filter,
        createdAt: newTodoList.createdAt,
        userId: newTodoList.userId,
        tasks: [],
      };
      dispatch(addTodoListAC(formattedTodo));
    } catch (error: any) {
      dispatch(setErrorAC(error.message));
      setTimeout(() => {
        dispatch(setErrorMessageDeleteAC(''));
      }, 3000);
    }
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
