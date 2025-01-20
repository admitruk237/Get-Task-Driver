import { v1 } from 'uuid';
import { FilteredValuesType, TodoListType } from '../App';

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

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todoListId1 = v1();

export const todoListId2 = v1();

const initialState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to learn', filter: 'All' },
  { id: todoListId2, title: 'What to buy', filter: 'All' },
];

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
