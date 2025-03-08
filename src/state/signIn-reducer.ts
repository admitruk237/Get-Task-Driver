export interface SignInStateType {
  accessToken: string;
  refreshToken: string;
}

const initialState: SignInStateType = {
  accessToken: '',
  refreshToken: '',
};

export enum SignInActionTypes {
  SET_ACCESS = 'SET_ACCESS',
  SET_REFRESH = 'SET_REFRESH',
}

interface SetAccessActionType {
  type: SignInActionTypes.SET_ACCESS;
  accessToken: string;
}

interface SetRefreshActionType {
  type: SignInActionTypes.SET_REFRESH;
  refreshToken: string;
}

type ActionsType = SetAccessActionType | SetRefreshActionType;

export const signInReducer = (
  state: SignInStateType | undefined,
  action: ActionsType
): SignInStateType => {
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case SignInActionTypes.SET_ACCESS:
      return { ...state, accessToken: action.accessToken };
    case SignInActionTypes.SET_REFRESH:
      return { ...state, refreshToken: action.refreshToken };
    default:
      return state;
  }
};

export const setAccessAC = (accessToken: string): SetAccessActionType => {
  return { type: SignInActionTypes.SET_ACCESS, accessToken };
};

export const setRefreshAC = (refreshToken: string): SetRefreshActionType => {
  return { type: SignInActionTypes.SET_REFRESH, refreshToken };
};
