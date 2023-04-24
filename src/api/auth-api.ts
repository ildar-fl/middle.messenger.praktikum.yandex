import { YaPraktikumRequest } from './ya-praktikum';

const enum AuthModel {
  login = 'login',
  password = 'password',
  repeatPassword = 'repeat_password',
  email = 'email',
  firstName = 'first_name',
  secondName = 'second_name',
  phone = 'phone',
  displayName = 'display_name',
  avatar = 'avatar',
}

type LoginRequest = {
  [AuthModel.login]: string;
  [AuthModel.password]: string;
};

type UserType = {
  [AuthModel.firstName]: string;
  [AuthModel.secondName]: string;
  [AuthModel.login]: string;
  [AuthModel.email]: string;
  [AuthModel.phone]: string;
  [AuthModel.password]: string;
};

type UserResponse = UserType & {
  id: string;
  [AuthModel.displayName]: string;
  [AuthModel.avatar]: string;
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

export { AuthApi, AuthModel };
