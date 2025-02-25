import {
  resetPasswordReducer,
  ResetPasswordStateType,
  SET_RESET_PASSWORD_DATA,
  setResetPasswordDataAC,
  setResetPasswordErrorAC,
  setResetPasswordSuccessAC,
} from './resetPassword-reducer';

test('should return the initial state', () => {
  const initialState: ResetPasswordStateType = {
    password: '',
    confirmPassword: '',
  };

  const action = {
    type: SET_RESET_PASSWORD_DATA,
    payload: initialState,
  };

  const newState = resetPasswordReducer(initialState, action);

  expect(newState).toEqual(initialState);
});

test('should handle SET_RESET_PASSWORD_DATA', () => {
  const initialState: ResetPasswordStateType = {
    password: '',
    confirmPassword: '',
  };

  const action = setResetPasswordDataAC({
    password: 'newPassword',
    confirmPassword: 'newPassword',
  });

  const newState = resetPasswordReducer(initialState, action);

  expect(newState?.password).toEqual('newPassword');
  expect(newState?.confirmPassword).toEqual('newPassword');
});

test('should handle SET_RESET_PASSWORD_ERROR', () => {
  const initialState: ResetPasswordStateType = {
    password: '',
    confirmPassword: '',
  };

  const action = setResetPasswordErrorAC('Error message');

  const newState = resetPasswordReducer(initialState, action);

  expect(newState.error).toEqual('Error message');
});

test('should handle SET_RESET_PASSWORD_SUCCESS', () => {
  const initialState: ResetPasswordStateType = {
    password: '',
    confirmPassword: '',
  };

  const action = setResetPasswordSuccessAC(true);

  const newState = resetPasswordReducer(initialState, action);

  expect(newState.success).toEqual(true);
});
