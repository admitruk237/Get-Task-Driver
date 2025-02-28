import axios from 'axios';

export interface SignUpType {
  email: string;
  userName: string;
  password: string;
  confirmPassword?: string;
}

export type SignUpResponseType = {
  messages: string;
  error: string | null;
  resultCode: number;
};

export const signUpApi = (data: SignUpType) => {
  return axios.post<SignUpResponseType>(
    'https://todo-backend-777.up.railway.app/auth/register',
    data
  );
};
