export interface userStateType {
  email: string;
  userName: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: userStateType = {
  email: '',
  userName: '',
  password: '',
  accessToken: '',
  refreshToken: '',
};

export enum UserActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_ACCESS = 'SET_ACCESS',
  SET_REFRESH = 'SET_REFRESH',
  SET_RESET_PASSWORD_DATA = 'SET_RESET_PASSWORD_DATA',
  SET_LONG_OUT = 'SET_LONG_OUT',
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

interface SetLongOutActionType {
  type: UserActionTypes.SET_LONG_OUT;
  payload: userStateType;
}

type ActionsType =
  | SetUserDataActionType
  | SetAccessActionType
  | SetRefreshActionType
  | SetResetPasswordDataActionType
  | SetLongOutActionType;

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
    case UserActionTypes.SET_LONG_OUT: {
      return { ...state, ...action.payload };
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

export const SetLongOutAC = (payload: userStateType): SetLongOutActionType => ({
  type: UserActionTypes.SET_LONG_OUT,
  payload,
});
