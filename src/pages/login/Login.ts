import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';
import { LoginController, LoginModel } from '../../controllers/login';
import { prepareForm } from '../../utils';

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

    const controller = new LoginController({
      login: errorMessage => {
        loginInput.setProps({ error: errorMessage });
      },
      password: errorMessage => {
        passwordInput.setProps({ error: errorMessage });
      },
    });

    loginInput.setProps({
      events: { blur: controller.checkInput },
    });
    passwordInput.setProps({
      events: { blur: controller.checkInput },
    });

    const handleSubmitForm = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(
        event.target as HTMLFormElement,
      ) as LoginModel;

      controller.login(formData);
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
