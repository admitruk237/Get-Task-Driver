import { a } from 'framer-motion/dist/types.d-6pKw1mTI';

type ErrorStateType = {
  error: string;
};

const initialState: ErrorStateType = {
  error: '',
};

export const SET_ERROR = 'SET-ERROR' as const;
export const SET_ERROR_MESSAGE_DELETE = 'SET-ERROR-MESSAGE-DELETE' as const;

interface SetErrorActionType {
  type: typeof SET_ERROR;
  error: string;
}
interface SetErrorMessageDeleteActionType {
  type: typeof SET_ERROR_MESSAGE_DELETE;
  error: string;
}

type ActionsType = SetErrorActionType | SetErrorMessageDeleteActionType;

export const errorReducer = (
  state: ErrorStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case 'SET-ERROR':
      return { ...state, error: action.error };
    case 'SET-ERROR-MESSAGE-DELETE':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setErrorAC = (error: string) => ({
  type: SET_ERROR,
  error,
});

export const setErrorMessageDeleteAC = (error: string) => ({
  type: SET_ERROR_MESSAGE_DELETE,
});
