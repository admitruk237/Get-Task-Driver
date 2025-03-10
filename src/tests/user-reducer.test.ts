import {
  setUserDataAC,
  userReducer,
  setResetPasswordDataAC,
  setRefreshAC,
  setAccessAC,
} from '../state/user-reducer';

test('correct user data should be set', () => {
  const startState = {
    email: '',
    userName: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  };

  const action = setUserDataAC({
    userName: 'test',
    email: 'test@test.com',
    password: 'test',
    accessToken: '',
    refreshToken: '',
  });

  const endState = userReducer(startState, action);

  expect(endState.userName).toBe('test');
  expect(endState.email).toBe('test@test.com');
  expect(endState.password).toBe('test');
  expect(endState.accessToken).toBe('');
  expect(endState.refreshToken).toBe('');
});

test('access token should be set', () => {
  const startState = {
    email: '',
    userName: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  };

  const action = setAccessAC('testToken');
  const endState = userReducer(startState, action);

  expect(endState['accessToken']).toBe('testToken');
  expect(endState['refreshToken']).toBe('');
});

test('refresh token should be set', () => {
  const startState = {
    email: '',
    userName: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  };

  const action = setRefreshAC('testRefreshToken');
  const endState = userReducer(startState, action);

  expect(endState['accessToken']).toBe('');
  expect(endState['refreshToken']).toBe('testRefreshToken');
});

test('password should be changed', () => {
  const startState = {
    email: '',
    userName: '',
    password: '',
    accessToken: '',
    refreshToken: '',
  };

  const action = setResetPasswordDataAC({
    email: '',
    userName: '',
    password: 'newPasswod',
    accessToken: '',
    refreshToken: '',
  });

  const endState = userReducer(startState, action);

  expect(endState.userName).toBe('');
  expect(endState.email).toBe('');
  expect(endState.password).toBe('newPasswod');
  expect(endState.accessToken).toBe('');
  expect(endState.refreshToken).toBe('');
});
