import { AuthApi } from '../api';
import {
  ConfigType,
  InputsType,
  INPUT_CONFIGS,
  useValidator,
} from '../utils/validator';

const LOGIN_CONFIG: ConfigType = {
  login: INPUT_CONFIGS.login,
  password: INPUT_CONFIGS.password,
};

interface LoginModel extends Record<string, string> {
  login: string;
  password: string;
}

class LoginController {
  public checkData;
  public checkInput;
  private loginApi;

  constructor(inputCallbacks: InputsType) {
    const loginApi = new AuthApi();
    const { checkData, checkInput } = useValidator(LOGIN_CONFIG, {
      inputs: inputCallbacks,
    });

    this.checkData = checkData;
    this.checkInput = checkInput;
    this.loginApi = loginApi;
  }

  public async login(data: LoginModel) {
    const errors = this.checkData(data);

    if (errors) return;

    try {
      const userID = await this.loginApi.singIn(data);

      console.log(userID);
    } catch (error) {
      console.log('try error in Login:', typeof error, error);
    }
    // запись данных в стору
  }
}

export { LoginController, LoginModel };
