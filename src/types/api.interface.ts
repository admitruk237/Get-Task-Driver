export interface AuthResponse {
  signInResponse: {
    accessToken: string;
    refreshToken: string;
  };
  signUpResponse: {
    id: string;
    email: string;
    userName: string;
    createdAt: string;
  };
  user: {
    id: string;
    email: string;
    userName: string;
  };
}
export enum ResponseMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type SignUpType = {
  email: string;
  userName: string;
  password: string;
};

export type SignInType = {
  userName: string;
  password: string;
};
