import {
  ConfigType,
  INPUT_CONFIGS,
  InputsType,
  useValidator,
} from '../utils/validator';
import { store } from '../core/store';
import { Router } from '../core';
import { UserModel, UserType, LoginType } from '../common/types';
import { ROUTS } from '../common/constants';
import { AuthApi } from '../api';
import { isServerError } from '../core/http';

const INPUTS_CONFIG: ConfigType = {
  [UserModel.login]: INPUT_CONFIGS.login,
  [UserModel.password]: INPUT_CONFIGS.password,
  [UserModel.email]: INPUT_CONFIGS.email,
  [UserModel.firstName]: INPUT_CONFIGS.name,
  [UserModel.secondName]: INPUT_CONFIGS.name,
  [UserModel.phone]: INPUT_CONFIGS.phone,
};

type RegistrationDataType = UserType & {
  [UserModel.password]: string;
  [UserModel.repeatPassword]: string;
};

class AuthController {
  public checkData;
  public checkInput;
  public setInputError;
  private authApi;

  constructor(inputCallbacks?: InputsType) {
    const authApi = new AuthApi();

    if (inputCallbacks) {
      const { checkData, checkInput, setInputError } = useValidator(
        INPUTS_CONFIG,
        {
          inputs: inputCallbacks,
        },
      );

      this.checkData = checkData;
      this.checkInput = checkInput;
      this.setInputError = setInputError;
    }

    this.authApi = authApi;
  }

  public async registration(data: RegistrationDataType) {
    const errors = this.checkData?.(data);

    if (errors) {
      return;
    }

    const { password, repeat_password: repeatPassword } = data;

    if (password !== repeatPassword) {
      this.setInputError?.(UserModel.repeatPassword, 'Пароли не совпадают!');
      return;
    }

    try {
      store.set('user.isLoading', true);
      await this.authApi.signUp(data);
      const userInfo = await this.authApi.getUser();

      store.set('user.data', userInfo);

      Router.__instance.go(ROUTS.PROFILE);
    } catch (error) {
      console.error('try error from Registration: ', error);
      store.set('user.error', error);
    } finally {
      store.set('user.isLoading', false);
    }
  }

  public async login(data: LoginType) {
    const errors = this.checkData?.(data);

    if (errors) return;

    try {
      store.set('user.isLoading', true);
      await this.authApi.singIn(data);
      const userInfo = await this.authApi.getUser();

      store.set('user.data', userInfo);

      Router.__instance.go(ROUTS.PROFILE);
    } catch (error) {
      if (isServerError(error)) {
        store.set('user.error', error.reason);
      }
    } finally {
      store.set('user.isLoading', false);
    }
  }

  public async logout() {
    try {
      await this.authApi.logout();

      store.set('user', undefined);

      Router.__instance.go(ROUTS.LOGIN);
    } catch (error) {
      console.error('try error in Logout:', error);
    }
  }
}

export { AuthController, RegistrationDataType };
