import {
  setSignInDataAC,
  setSignInErrorAC,
  setSignInSuccessAC,
  signInReducer,
  SignInStateType,
} from './signIn-reducer';

test('correct sign in data should be set', () => {
  const startState: SignInStateType = {
    username: '',
    password: '',
    error: '',
    success: false,
  };

  const action = setSignInDataAC({
    username: 'testName',
    password: 'testPassword',
    error: 'test error',
    success: true,
  });

  const endState = signInReducer(startState, action);

  expect(endState.username).toBe('testName');
  expect(endState.password).toBe('testPassword');
  expect(endState.error).toBe('test error');
  expect(endState.success).toBe(true);
});

test('correct sign in error should be set', () => {
  const startState: SignInStateType = {
    username: '',
    password: '',
    error: '',
    success: false,
  };

  const action = setSignInErrorAC('test error');

  const endState = signInReducer(startState, action);

  expect(endState.error).toBe('test error');
});

test('correct sign in success should be set', () => {
  const startState: SignInStateType = {
    username: '',
    password: '',
    error: '',
    success: false,
  };

  const action = setSignInSuccessAC(true);

  const endState = signInReducer(startState, action);

  expect(endState.success).toBe(true);
});
