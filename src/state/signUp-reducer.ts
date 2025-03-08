export interface SignUpStateType {
  userName: string;
  email: string;
  password: string;
  success?: boolean;
}

const initialState: SignUpStateType = {
  userName: '',
  email: '',
  password: '',
  success: false,
};

export enum SignUpActionTypes {
  SET_SIGN_UP_DATA = 'SET-SIGN-UP-DATA',
  SET_SIGN_UP_SUCCESS = 'SET-SIGN-UP-SUCCESS',
}

interface SetSignUpDataActionType {
  type: SignUpActionTypes.SET_SIGN_UP_DATA;
  payload: SignUpStateType;
}

interface SetSignUpSuccessActionType {
  type: SignUpActionTypes.SET_SIGN_UP_SUCCESS;
  success: boolean;
}

type ActionsType = SetSignUpDataActionType | SetSignUpSuccessActionType;

export const signUpReducer = (
  state: SignUpStateType = initialState,
  action: ActionsType
): SignUpStateType => {
  switch (action.type) {
    case SignUpActionTypes.SET_SIGN_UP_DATA:
      return { ...state, ...action.payload };
    case SignUpActionTypes.SET_SIGN_UP_SUCCESS:
      return { ...state, success: action.success };
    default:
      return state;
  }
};

export const setSignUpDataAC = (
  payload: SignUpStateType
): SetSignUpDataActionType => ({
  type: SignUpActionTypes.SET_SIGN_UP_DATA,
  payload,
});

export const setSignUpSuccessAC = (
  success: boolean
): SetSignUpSuccessActionType => ({
  type: SignUpActionTypes.SET_SIGN_UP_SUCCESS,
  success,
});
