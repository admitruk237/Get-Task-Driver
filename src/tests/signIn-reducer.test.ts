import { set } from 'react-hook-form';
import {
  setAccessAC,
  setRefreshAC,
  signInReducer,
} from '../state/signIn-reducer';
import { setRef } from '@mui/material';

test('access token should be set', () => {
  const initialState = {
    accessToken: '',
    refreshToken: '',
  };
  const action = setAccessAC('testToken');
  const endState = signInReducer(initialState, action);

  expect(endState.accessToken).toBe('testToken');
});

test('refresh token should be set', () => {
  const initialState = {
    accessToken: '',
    refreshToken: '',
  };
  const action = setRefreshAC('RefreshToken');
  const endState = signInReducer(initialState, action);

  expect(endState.refreshToken).toBe('RefreshToken');
});
