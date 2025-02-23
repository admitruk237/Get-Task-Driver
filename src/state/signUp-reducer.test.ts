import {
  setSignUpDataAC,
  setSignUpErrorAC,
  setSignUpSuccessAC,
  signUpReducer,
  SignUpStateType,
} from './signUp-reducer';

test('correct sign up data should be set', () => {
  const startState: SignUpStateType = {
    username: '',
    email: '',
    password: '',
  };

  const action = setSignUpDataAC({
    username: 'test',
    email: 'test@test.com',
    password: 'test',
  } as SignUpStateType);

  const endState = signUpReducer(startState, action);

  expect(endState.username).toBe('test');
  expect(endState.email).toBe('test@test.com');
  expect(endState.password).toBe('test');
});

test('correct sign up error should be set', () => {
  const startState: SignUpStateType = {
    username: '',
    email: '',
    password: '',
  };

  const action = setSignUpErrorAC('test error');

  const endState = signUpReducer(startState, action);

  expect(endState).toEqual({
    username: '',
    email: '',
    password: '',
    error: 'test error',
  });
});

test('correct sign up success should be set', () => {
  const startState: SignUpStateType = {
    username: '',
    email: '',
    password: '',
  };

  const action = setSignUpSuccessAC(true);

  const endState = signUpReducer(startState, action);

  expect(endState).toEqual({
    username: '',
    email: '',
    password: '',
    success: true,
  });
});
