export interface SignUpStateType {
  username: string;
  email: string;
  password: string;
}

export const initialState: SignUpStateType = {
  username: '',
  email: '',
  password: '',
};

export const SET_SIGN_UP_DATA = 'SET-SIGN-UP-DATA' as const;
export const SET_SIGN_UP_ERROR = 'SET-SIGN-UP-ERROR' as const;
export const SET_SIGN_UP_SUCCESS = 'SET-SIGN-UP-SUCCESS' as const;

interface SetSignUpDataActionType {
  type: typeof SET_SIGN_UP_DATA;
  payload: SignUpStateType;
}

interface SetSignUpErrorActionType {
  type: typeof SET_SIGN_UP_ERROR;
  error: string;
}

interface SetSignUpSuccessActionType {
  type: typeof SET_SIGN_UP_SUCCESS;
  success: boolean;
}

type ActionsType =
  | SetSignUpDataActionType
  | SetSignUpErrorActionType
  | SetSignUpSuccessActionType;

export const signUpReducer = (
  state: SignUpStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case 'SET-SIGN-UP-DATA':
      return { ...state, ...action.payload };
    case 'SET-SIGN-UP-ERROR':
      return { ...state, error: action.error };
    case 'SET-SIGN-UP-SUCCESS':
      return { ...state, success: action.success };
  }
};

export const setSignUpDataAC = (payload: SignUpStateType) => ({
  type: SET_SIGN_UP_DATA,
  payload,
});

export const setSignUpErrorAC = (error: string) => ({
  type: SET_SIGN_UP_ERROR,
  error,
});

export const setSignUpSuccessAC = (success: boolean) => ({
  type: SET_SIGN_UP_SUCCESS,
  success,
});
