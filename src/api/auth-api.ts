import { YaPraktikumRequest } from './ya-praktikum';

type LoginRequest = {
  login: string;
  password: string;
};

type UserType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

type UserResponse = UserType & {
  id: string;
  display_name: string;
  avatar: string;
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
