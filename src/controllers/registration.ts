import {
  ConfigType,
  INPUT_CONFIGS,
  InputsType,
  useValidator,
} from '../utils/validator';
import { store } from '../core/store';
import { UserModel } from '../common/types';
import { AuthApi } from '../api';

const REGISTRATION_MODEL = {
  login: UserModel.login,
  password: UserModel.password,
  email: UserModel.email,
  firstName: UserModel.firstName,
  secondName: UserModel.secondName,
  phone: UserModel.phone,
  repeatPassword: 'repeat_password',
};

const REGISTRATION_CONFIG: ConfigType = {
  [REGISTRATION_MODEL.login]: INPUT_CONFIGS.login,
  [REGISTRATION_MODEL.password]: INPUT_CONFIGS.password,
  [REGISTRATION_MODEL.email]: INPUT_CONFIGS.email,
  [REGISTRATION_MODEL.firstName]: INPUT_CONFIGS.name,
  [REGISTRATION_MODEL.secondName]: INPUT_CONFIGS.name,
  [REGISTRATION_MODEL.phone]: INPUT_CONFIGS.phone,
};

interface IRegistrationModel extends Record<string, string> {
  [UserModel.firstName]: string;
  [UserModel.secondName]: string;
  [UserModel.login]: string;
  [UserModel.email]: string;
  [UserModel.phone]: string;
  [UserModel.password]: string;
  repeat_password: string;
}

class RegistrationController {
  public checkData;
  public checkInput;
  public setInputError;
  private registrationApi;

  constructor(inputCallbacks: InputsType) {
    const registrationApi = new AuthApi();
    const { checkData, checkInput, setInputError } = useValidator(
      REGISTRATION_CONFIG,
      {
        inputs: inputCallbacks,
      },
    );

    this.checkData = checkData;
    this.checkInput = checkInput;
    this.setInputError = setInputError;
    this.registrationApi = registrationApi;
  }

  public async registration(data: IRegistrationModel) {
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
      await this.registrationApi.signUp(data);
      const userInfo = await this.registrationApi.getUser();

      store.set('user', userInfo);
      console.log(userInfo);
      // произвести запись в стору и произвести редирект в чаты
    } catch (error) {
      console.log('try error from registration: ', error);
    }
  }
}

export { RegistrationController, IRegistrationModel, REGISTRATION_MODEL };
