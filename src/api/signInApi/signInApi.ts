import axios from 'axios';

export interface SignInResponseType {
  accessToken: string;
  refreshToken: string;
}

// 📌 Функція для входу (login)
export const signInApi = async (email: string, password: string) => {
  const response = await axios.post<SignInResponseType>(
    'https://todo-backend-777.up.railway.app/auth/login',
    {
      email,
      password,
    }
  );

  // Зберігаємо токени у localStorage
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);

  return response.data;
};

// 📌 Функція для виходу (logout)
export const logoutApi = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// 📌 Функція для оновлення токена
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('Немає refreshToken');

  const response = await axios.post<SignInResponseType>('/auth/refresh', {
    refreshToken,
  });

  localStorage.setItem('accessToken', response.data.accessToken);
  return response.data.accessToken;
};
