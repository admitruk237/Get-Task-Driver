export interface userStateType {
  email: string;
  userName: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  authStatus?: boolean;
}

const initialState: userStateType = {
  email: '',
  userName: '',
  password: '',
  accessToken: '',
  refreshToken: '',
  authStatus: false,
};

export enum UserActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_ACCESS = 'SET_ACCESS',
  SET_REFRESH = 'SET_REFRESH',
  SET_RESET_PASSWORD_DATA = 'SET_RESET_PASSWORD_DATA',
  SET_AUTH_STATUS = 'SET_AUTH_STATUS',
}

interface SetUserDataActionType {
  type: UserActionTypes.SET_USER_DATA;
  payload: userStateType;
}

interface SetAccessActionType {
  type: UserActionTypes.SET_ACCESS;
  accessToken: string;
}

interface SetRefreshActionType {
  type: UserActionTypes.SET_REFRESH;
  refreshToken: string;
}

interface SetResetPasswordDataActionType {
  type: UserActionTypes.SET_RESET_PASSWORD_DATA;
  payload: userStateType;
}

interface SetAuthStatusActionType {
  type: UserActionTypes.SET_AUTH_STATUS;
  authStatus: boolean;
}

type ActionsType =
  | SetUserDataActionType
  | SetAccessActionType
  | SetRefreshActionType
  | SetResetPasswordDataActionType
  | SetAuthStatusActionType;

export const userReducer = (
  state: userStateType = initialState,
  action: ActionsType
): userStateType => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA: {
      return { ...state, ...action.payload };
    }
    case UserActionTypes.SET_ACCESS: {
      return { ...state, accessToken: action.accessToken };
    }
    case UserActionTypes.SET_REFRESH: {
      return { ...state, refreshToken: action.refreshToken };
    }
    case UserActionTypes.SET_RESET_PASSWORD_DATA: {
      return { ...state, ...action.payload };
    }
    case UserActionTypes.SET_AUTH_STATUS: {
      return { ...state, authStatus: action.authStatus };
    }
    default:
      return state;
  }
};

export const setUserDataAC = (
  payload: userStateType
): SetUserDataActionType => ({
  type: UserActionTypes.SET_USER_DATA,
  payload,
});

export const setAccessAC = (accessToken: string): SetAccessActionType => ({
  type: UserActionTypes.SET_ACCESS,
  accessToken,
});

export const setRefreshAC = (refreshToken: string): SetRefreshActionType => ({
  type: UserActionTypes.SET_REFRESH,
  refreshToken,
});

export const setResetPasswordDataAC = (
  payload: userStateType
): SetResetPasswordDataActionType => ({
  type: UserActionTypes.SET_RESET_PASSWORD_DATA,
  payload,
});

export const setAuthStatusAC = (
  authStatus: boolean
): SetAuthStatusActionType => ({
  type: UserActionTypes.SET_AUTH_STATUS,
  authStatus,
});
