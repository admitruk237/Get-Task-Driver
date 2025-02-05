import { v1 } from 'uuid';
import { FilteredValuesType, TodoListType } from '../AppWithRedux';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  id: string;
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
  todoLists: Array<TodoListType>;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodoListsActionType;

export const todoListId1 = v1();

export const todoListId2 = v1();

const initialState: Array<TodoListType> = [];

export const todoListReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return [...state.filter((tl) => tl.id !== action.id)];
    }
    case 'ADD-TODOLIST': {
      return [
        {
          id: action.id,
          filter: 'All',
          title: action.title,
          addedDate: new Date().toISOString(),
          order: 0,
        },
        ...state,
      ];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return [
        ...state.map((tl) => {
          if (tl.id === action.id) {
            return { ...tl, title: action.title };
          } else {
            return tl;
          }
        }),
      ];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return [
        ...state.map((tl) => {
          if (tl.id === action.id) {
            return { ...tl, filter: action.filter };
          } else {
            return tl;
          }
        }),
      ];
    }
    case 'SET-TODOLISTS': {
      return action.todoLists;
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

export const addTodoListAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, id: v1() };
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
  todoLists: TodoListType[]
): SetTodoListsActionType => {
  return { type: 'SET-TODOLISTS', todoLists };
};
