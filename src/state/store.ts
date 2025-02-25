import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { todoListReducer } from './todoList-reducer';
import { tasksReducer } from './tasks-reducer';
import { signUpReducer } from './signUp-reducer';
import { resetPasswordReducer } from './resetPassword-reducer';
import { signInReducer } from './signIn-reducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
  signUp: signUpReducer,
  resetPassword: resetPasswordReducer,
  signIn: signInReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

// @ts-ignore
window.store = store;
