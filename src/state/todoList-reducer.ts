import { v1 } from 'uuid';
import { FilteredValuesType, TodoListType } from '../App';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
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

export const todoListReducer = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [
        ...state,
        {
          id: v1(),
          filter: 'All',
          title: action.title,
        },
      ];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      let todoList = state.find((t) => t.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todoListId };
};

export const addTodoListAC = (
  newTodoListTitle: string
): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: newTodoListTitle };
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
