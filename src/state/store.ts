import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { todoListReducer } from './todoList-reducer';
import { tasksReducer } from './tasks-reducer';
import { errorReducer } from './error-reducer';
import { userReducer } from './user-reducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
  user: userReducer,
  error: errorReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});

// @ts-ignore
window.store = store;
