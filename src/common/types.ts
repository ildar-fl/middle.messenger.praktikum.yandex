export const enum UserModel {
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

export type UserType = {
  [UserModel.firstName]: string;
  [UserModel.secondName]: string;
  [UserModel.displayName]: string;
  [UserModel.login]: string;
  [UserModel.email]: string;
  [UserModel.phone]: string;
};

export type LoginType = {
  [UserModel.login]: string;
  [UserModel.password]: string;
};
