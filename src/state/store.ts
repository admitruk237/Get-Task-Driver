import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { todoListReducer } from './todoList-reducer';
import { tasksReducer } from './tasks-reducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

// @ts-ignore
window.store = store;
