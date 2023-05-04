import {
  ConfigType,
  INPUT_CONFIGS,
  InputsType,
  useValidator,
} from '../utils/validator';
import { store } from '../core/store';
import { UserModel, UserType, LoginType } from '../common/types';
import { AuthApi } from '../api';

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

  constructor(inputCallbacks: InputsType) {
    const registrationApi = new AuthApi();
    const { checkData, checkInput, setInputError } = useValidator(
      INPUTS_CONFIG,
      {
        inputs: inputCallbacks,
      },
    );

    this.checkData = checkData;
    this.checkInput = checkInput;
    this.setInputError = setInputError;
    this.authApi = registrationApi;
  }

  public async registration(data: RegistrationDataType) {
    const errors = this.checkData(data);

    if (errors) {
      return;
    }

    const { password, repeat_password: repeatPassword } = data;

    if (password !== repeatPassword) {
      this.setInputError(UserModel.repeatPassword, 'Пароли не совпадают!');
      return;
    }

    try {
      await this.authApi.signUp(data);
      const userInfo = await this.authApi.getUser();

      store.set('user', userInfo);
      console.log(userInfo);
      // произвести запись в стору и произвести редирект в чаты
    } catch (error) {
      console.error('try error from Registration: ', error);
    }
  }

  public async login(data: LoginType) {
    const errors = this.checkData(data);

    if (errors) return;

    try {
      await this.authApi.singIn(data);

      const userInfo = await this.authApi.getUser();

      console.log(userInfo);
      // произвести запись в стору и произвести редирект
    } catch (error) {
      console.error('try error in Login:', typeof error, error);
    }
    // запись данных в стору
  }

  public async logout() {
    try {
      await this.authApi.logout();

      store.set('user', null);
    } catch (error) {
      console.error('try error in Logout:', error);
    }
  }
}

export { AuthController, RegistrationDataType };
