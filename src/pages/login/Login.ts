import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';
import { LoginType } from '../../common/types';
import { AuthController } from '../../controllers/authConroller';
import { prepareForm } from '../../utils';

class Login extends CenteredPage {
  private form;
  private controller;

  constructor() {
    const loginInput = new TextInput({
      placeholder: 'Логин',
      name: 'login',
      value: 'ildaryxa', // todo remove it
    });

    const passwordInput = new TextInput({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      value: 'Password1', // todo remove it
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

    const controller = new AuthController({
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

    const form = new Form({
      title: 'Вход',
      attrs: {
        name: 'loginForm',
      },
      content: { loginInput, passwordInput },
      buttons: { authButton, registrationButton },
    });

    super({ content: form });

    this.form = form;
    this.controller = controller;
  }

  init() {
    super.init();

    this.form.setProps({
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = prepareForm(event.target as HTMLFormElement) as LoginType;

    this.controller.login(formData);
  }
}

export { Login };
