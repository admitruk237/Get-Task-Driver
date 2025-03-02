import axios from 'axios';

export interface SignUpType {
  email: string;
  userName: string;
  password: string;
  confirmPassword?: string;
}

// Оновлений тип відповіді від API
export type SignUpResponseType = {
  id: string;
  email: string;
  userName: string;
  createdAt: string;
};

// Запит на реєстрацію
export const signUpApi = async (data: SignUpType) => {
  const response = await axios.post<SignUpResponseType>(
    'https://todo-backend-777.up.railway.app/auth/signup',
    data
  );

  // Перевіряємо статус відповіді
  if (response.status === 201) {
    return response.data; // ✅ Успішна реєстрація
  } else {
    throw new Error('❌ Неочікуваний статус відповіді: ' + response.status);
  }
};
