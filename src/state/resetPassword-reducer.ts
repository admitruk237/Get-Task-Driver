export interface ResetPasswordStateType {
  password: string;
  confirmPassword: string;
  error?: string;
  success?: boolean;
}

const initialState: ResetPasswordStateType = {
  password: '',
  confirmPassword: '',
};

export const SET_RESET_PASSWORD_DATA = 'SET-RESET-PASSWORD-DATA' as const;
export const SET_RESET_PASSWORD_ERROR = 'SET-RESET-PASSWORD-ERROR' as const;
export const SET_RESET_PASSWORD_SUCCESS = 'SET-RESET-PASSWORD-SUCCESS' as const;

interface SetResetPasswordDataActionType {
  type: typeof SET_RESET_PASSWORD_DATA;
  payload: ResetPasswordStateType;
}

interface SetResetPasswordErrorActionType {
  type: typeof SET_RESET_PASSWORD_ERROR;
  error: string;
}

interface SetResetPasswordSuccessActionType {
  type: typeof SET_RESET_PASSWORD_SUCCESS;
  success: boolean;
}

type ActionsType =
  | SetResetPasswordDataActionType
  | SetResetPasswordErrorActionType
  | SetResetPasswordSuccessActionType;

export const resetPasswordReducer = (
  state: ResetPasswordStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case SET_RESET_PASSWORD_DATA:
      return { ...state, ...action.payload };
    case SET_RESET_PASSWORD_ERROR:
      return { ...state, error: action.error };
    case SET_RESET_PASSWORD_SUCCESS:
      return { ...state, success: action.success };
    default:
      return state;
  }
};

export const setResetPasswordDataAC = (payload: ResetPasswordStateType) => {
  return {
    type: SET_RESET_PASSWORD_DATA,
    payload,
  };
};

export const setResetPasswordErrorAC = (error: string) => {
  return {
    type: SET_RESET_PASSWORD_ERROR,
    error,
  };
};

export const setResetPasswordSuccessAC = (success: boolean) => {
  return {
    type: SET_RESET_PASSWORD_SUCCESS,
    success,
  };
};
