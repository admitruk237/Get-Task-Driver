import {
  setSignUpDataAC,
  setSignUpSuccessAC,
  signUpReducer,
  SignUpStateType,
} from './signUp-reducer';

test('correct sign up data should be set', () => {
  const startState: SignUpStateType = {
    userName: '',
    email: '',
    password: '',
    success: false,
  };

  const action = setSignUpDataAC({
    userName: 'test',
    email: 'test@test.com',
    password: 'test',
    success: true,
  });

  const endState = signUpReducer(startState, action);

  expect(endState.userName).toBe('test');
  expect(endState.email).toBe('test@test.com');
  expect(endState.password).toBe('test');
});
