import {
  ConfigType,
  INPUT_CONFIGS,
  InputsType,
  useValidator,
} from '../utils/validator';
import { AuthApi, AuthModel } from '../api';

const REGISTRATION_MODEL = {
  login: AuthModel.login,
  password: AuthModel.password,
  email: AuthModel.email,
  firstName: AuthModel.firstName,
  secondName: AuthModel.secondName,
  phone: AuthModel.phone,
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
  [AuthModel.firstName]: string;
  [AuthModel.secondName]: string;
  [AuthModel.login]: string;
  [AuthModel.email]: string;
  [AuthModel.phone]: string;
  [AuthModel.password]: string;
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
      this.setInputError(AuthModel.repeatPassword, 'Пароли не совпадают!');
      return;
    }

    try {
      const result = await this.registrationApi.signUp(data);

      console.log('registration result: ', result);
    } catch (error) {
      console.log('try error from registration: ', error);
    }
  }
}

export { RegistrationController, IRegistrationModel, REGISTRATION_MODEL };
