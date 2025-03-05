import { FilteredValuesType, TaskType } from '../types/todo.interface';
import { ResponseTypeTodo } from '../types/todo.interface';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  todoList: ResponseTypeTodo;
};

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilteredValuesType;
};

export type SetTodoListsActionType = {
  type: 'SET-TODOLISTS';
  todoLists: Array<ResponseTypeTodo>;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodoListsActionType;

const initialState: Array<ResponseTypeTodo> = [];

export const todoListReducer = (
  state: Array<ResponseTypeTodo> = initialState,
  action: ActionsType
): Array<ResponseTypeTodo> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return [...state.filter((tl) => tl.id !== action.id)];
    }
    case 'ADD-TODOLIST': {
      return [action.todoList, ...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map((tl) => {
        if (tl.id === action.id) {
          return { ...tl, title: action.title };
        } else {
          return tl;
        }
      });
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map((tl) => {
        if (tl.id === action.id) {
          return { ...tl, filter: action.filter };
        } else {
          return tl;
        }
      });
    }
    case 'SET-TODOLISTS': {
      return action.todoLists.map((todo) => ({
        ...todo,
        tasks: todo.tasks || [],
      }));
    }
    default:
      return state;
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todoListId };
};

export const addTodoListAC = (
  todoList: ResponseTypeTodo
): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todoList };
};

export const changeTodolistTitleAC = (
  todolistId: string,
  newTodoListTitle: string
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTodoListTitle,
  };
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilteredValuesType
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: filter,
  };
};

export const setTodoListsAC = (
  todoLists: ResponseTypeTodo[]
): SetTodoListsActionType => {
  return { type: 'SET-TODOLISTS', todoLists };
};
