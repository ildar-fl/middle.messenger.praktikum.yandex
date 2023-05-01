import { YaPraktikumRequest } from './ya-praktikum';
import { UserModel, UserType } from '../common/types';

type LoginRequest = {
  [UserModel.login]: string;
  [UserModel.password]: string;
};

type UserRequest = UserType & {
  [UserModel.password]: string;
};

type UserResponse = UserRequest & {
  id: string;
  [UserModel.displayName]: string;
  [UserModel.avatar]: string;
};

const authAPIInstance = new YaPraktikumRequest('/auth');

class AuthApi {
  singIn(user: LoginRequest): Promise<void> {
    return authAPIInstance.post<LoginRequest, void>('/signin', user);
  }

  signUp(user: UserType): Promise<{ id: string }> {
    return authAPIInstance.post<UserType, { id: string }>('/signup', user);
  }

  getUser(): Promise<UserResponse> {
    return authAPIInstance.get<UserResponse>('/user');
  }

  logout(): Promise<never> {
    return authAPIInstance.post('/logout');
  }
}

export { AuthApi };
