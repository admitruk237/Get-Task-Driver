export interface SignInStateType {
  username: string;
  password: string;
  error: string;
  success: boolean;
}

const initialState: SignInStateType = {
  username: '',
  password: '',
  error: '',
  success: false,
};

export const SET_SIGN_IN_DATA = 'SET-SIGN-IN-DATA' as const;
export const SET_SIGN_IN_ERROR = 'SET-SIGN-IN-ERROR' as const;
export const SET_SIGN_IN_SUCCESS = 'SET-SIGN-IN-SUCCESS' as const;

interface SetSignInDataActionType {
  type: typeof SET_SIGN_IN_DATA;
  payload: SignInStateType;
}

interface SetSignInErrorActionType {
  type: typeof SET_SIGN_IN_ERROR;
  error: string;
}

interface SetSignInSuccessActionType {
  type: typeof SET_SIGN_IN_SUCCESS;
  success: boolean;
}

type ActionsType =
  | SetSignInDataActionType
  | SetSignInErrorActionType
  | SetSignInSuccessActionType;

export const signInReducer = (
  state: SignInStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case SET_SIGN_IN_DATA:
      return { ...state, ...action.payload };
    case SET_SIGN_IN_ERROR:
      return { ...state, error: action.error };
    case SET_SIGN_IN_SUCCESS:
      return { ...state, success: action.success };
  }
};

export const setSignInDataAC = (payload: SignInStateType) => ({
  type: SET_SIGN_IN_DATA,
  payload,
});

export const setSignInErrorAC = (error: string) => ({
  type: SET_SIGN_IN_ERROR,
  error,
});

export const setSignInSuccessAC = (success: boolean) => ({
  type: SET_SIGN_IN_SUCCESS,
  success,
});
