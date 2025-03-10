export interface SignUpStateType {
  userName: string;
  email: string;
  password: string;
}

const initialState: SignUpStateType = {
  userName: '',
  email: '',
  password: '',
};

export enum SignUpActionTypes {
  SET_SIGN_UP_DATA = 'SET-SIGN-UP-DATA',
}

interface SetSignUpDataActionType {
  type: SignUpActionTypes.SET_SIGN_UP_DATA;
  payload: SignUpStateType;
}

type ActionsType = SetSignUpDataActionType;

export const signUpReducer = (
  state: SignUpStateType = initialState,
  action: ActionsType
): SignUpStateType => {
  switch (action.type) {
    case SignUpActionTypes.SET_SIGN_UP_DATA:
      return { ...state, ...action.payload };

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
