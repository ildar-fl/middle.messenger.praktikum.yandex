import { HttpTransport, BaseApi } from 'core';
import { UserType } from './types';

type LoginRequest = {
  login: string;
  password: string;
};
type LoginResponse = { user_id: string };

const authAPIInstance = new HttpTransport('api/v1/auth');

class AuthApi extends BaseApi {
  login(user: LoginRequest): Promise<string> {
    return authAPIInstance
      .post<LoginRequest, LoginResponse>('/signin', user)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  registration(user: UserType): Promise<UserType> {
    return authAPIInstance.post<UserType, UserType>('/signup', user);
  }

  getUser(): Promise<UserType> {
    return authAPIInstance.get<UserType>('/user');
  }

  logout(): Promise<never> {
    return authAPIInstance.post('/logout');
  }
}

export { AuthApi };
