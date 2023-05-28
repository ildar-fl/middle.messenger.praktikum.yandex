import { Form, TextInput, Button, ButtonText, Notice } from '../../ui';
import { CenteredPage } from '../../layouts';
import { LoginType, UserType } from '../../common/types';
import { AuthController } from '../../controllers/authConroller';
import { prepareForm } from '../../utils';
import { connect } from '../../core/store';

type LoginProps = {
  isLoading?: boolean;
  user?: UserType;
  error?: string;
};

class LoginInner extends CenteredPage {
  private form;
  private controller;
  private authButton: Button;
  private noticeMessage: Notice;

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

    const noticeMessage = new Notice();

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
      content: { loginInput, passwordInput, noticeMessage },
      buttons: { authButton, registrationButton },
    });

    super({ content: form });

    this.form = form;
    this.controller = controller;
    this.authButton = authButton;
    this.noticeMessage = noticeMessage;
  }

  init() {
    super.init();

    this.form.setProps({
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  setProps(nextProps: any) {
    const loginProps = nextProps as LoginProps;

    if (loginProps.isLoading) {
      this.authButton.setProps({
        attrs: { disabled: 'true' },
        text: 'Загрузка...',
      });
    }

    if (loginProps.error) {
      this.noticeMessage.setProps({ text: loginProps.error });
    }

    super.setProps(nextProps);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = prepareForm(event.target as HTMLFormElement) as LoginType;

    this.controller.login(formData);
  }
}

const Login = connect(({ user }) => ({
  isLoading: user?.isLoading,
  user: user?.data,
  error: user?.error,
}))(LoginInner);

export { Login };
