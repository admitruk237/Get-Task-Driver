import { Dispatch } from 'redux';
import { setErrorAC, setErrorMessageDeleteAC } from '../state/error-reducer';
import { ERROR_DISPLAY_DURATION } from './constants';

export const handleError = (dispatch: Dispatch, error: unknown): void => {
  const errorMessage =
    error instanceof Error ? error.message : 'Unknown error occurred';

  dispatch(setErrorAC(errorMessage));

  setTimeout(() => {
    dispatch(setErrorMessageDeleteAC(''));
  }, ERROR_DISPLAY_DURATION);
};
