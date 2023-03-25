import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';
import {
  prepareForm,
  ConfigType,
  useValidator,
  INPUT_CONFIGS,
} from '../../utils';

const LOGIN_CONFIG: ConfigType = {
  login: INPUT_CONFIGS.login,
  password: INPUT_CONFIGS.password,
};

class Login extends CenteredPage {
  constructor() {
    const loginInput = new TextInput({
      placeholder: 'Логин',
      name: 'login',
    });

    const passwordInput = new TextInput({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
    });

    const authButton = new Button({
      attrs: {
        type: 'submit',
      },
      text: 'Авторизоваться',
    });

    const registrationButton = new ButtonText({
      attrs: {
        as: 'a',
        href: '/registration',
        class: ['m__l-auto', 'm__r-auto'],
      },
      text: 'Нет аккаунта?',
    });

    const { checkData } = useValidator(LOGIN_CONFIG, {
      init: ({ checkInput }) => {
        loginInput.setProps({
          events: { blur: checkInput },
        });
        passwordInput.setProps({
          events: { blur: checkInput },
        });
      },
      inputs: {
        login: errorMessage => {
          loginInput.setProps({ error: errorMessage });
        },
        password: errorMessage => {
          passwordInput.setProps({ error: errorMessage });
        },
      },
    });

    const handleSubmitForm = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(event.target as HTMLFormElement);
      checkData(formData);
      console.log(formData);
    };

    const form = new Form({
      title: 'Вход',
      attrs: {
        name: 'loginForm',
      },
      content: { loginInput, passwordInput },
      buttons: { authButton, registrationButton },
      events: {
        submit: handleSubmitForm,
      },
    });

    super({ content: form });
  }
}

export { Login };
