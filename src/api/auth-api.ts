import { YaPraktikumRequest } from './ya-praktikum';
import { UserModel, UserType, LoginType } from '../common/types';

type UserRequest = UserType & {
  [UserModel.password]: string;
};

type UserResponse = UserType & {
  id: string;
  [UserModel.displayName]: string;
  [UserModel.avatar]: string;
};

const authAPIInstance = new YaPraktikumRequest('/auth');

class AuthApi {
  singIn(user: LoginType): Promise<void> {
    return authAPIInstance.post<LoginType, void>('/signin', user);
  }

  signUp(user: UserRequest): Promise<{ id: string }> {
    return authAPIInstance.post<UserRequest, { id: string }>('/signup', user);
  }

  getUser(): Promise<UserResponse> {
    return authAPIInstance.get<UserResponse>('/user');
  }

  logout(): Promise<never> {
    return authAPIInstance.post('/logout');
  }
}

export { AuthApi };
