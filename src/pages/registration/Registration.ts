import { TextInput, Button, ButtonText, Form } from '../../ui';
import { CenteredPage } from '../../layouts';
import { prepareForm } from '../../utils';
import { UserModel } from '../../common/types';
import {
  AuthController,
  RegistrationDataType,
} from '../../controllers/authConroller';

class Registration extends CenteredPage {
  constructor() {
    const emailInput = new TextInput({
      placeholder: 'Почта',
      name: UserModel.email,
      value: 'ildaryxa@gmail.com', // todo remove it
    });

    const loginInput = new TextInput({
      placeholder: 'Логин',
      name: UserModel.login,
      value: 'ildaryxa', // todo remove it
    });

    const firstNameInput = new TextInput({
      placeholder: 'Имя',
      name: UserModel.firstName,
      value: 'Ildar', // todo remove it
    });

    const secondNameInput = new TextInput({
      placeholder: 'Фамилия',
      name: UserModel.secondName,
      value: 'Fashet', // todo remove it
    });

    const phoneInput = new TextInput({
      placeholder: 'Телефон',
      type: 'phone',
      name: UserModel.phone,
      value: '89124897471', // todo remove it
    });

    const passwordInput = new TextInput({
      placeholder: 'Пароль',
      name: UserModel.password,
      type: 'password',
      value: 'Password1', // todo remove it
    });

    const repeatPassword = new TextInput({
      placeholder: 'Пароль (еще раз)',
      name: UserModel.repeatPassword,
      type: 'password',
      value: 'Password1', // todo remove it
    });

    const controller = new AuthController({
      [UserModel.login]: errorMessage => {
        loginInput.setProps({ error: errorMessage });
      },
      [UserModel.email]: errorMessage => {
        emailInput.setProps({ error: errorMessage });
      },
      [UserModel.password]: errorMessage => {
        passwordInput.setProps({ error: errorMessage });
      },
      [UserModel.firstName]: errorMessage => {
        firstNameInput.setProps({ error: errorMessage });
      },
      [UserModel.secondName]: errorMessage => {
        secondNameInput.setProps({ error: errorMessage });
      },
      [UserModel.phone]: errorMessage => {
        phoneInput.setProps({ error: errorMessage });
      },
      [UserModel.repeatPassword]: errorMessage => {
        repeatPassword.setProps({ error: errorMessage });
      },
    });

    const eventsObject = {
      events: { blur: controller.checkInput },
    };
    loginInput.setProps(eventsObject);
    emailInput.setProps(eventsObject);
    passwordInput.setProps(eventsObject);
    firstNameInput.setProps(eventsObject);
    secondNameInput.setProps(eventsObject);
    phoneInput.setProps(eventsObject);

    const registrationButton = new Button({
      attrs: {
        type: 'submit',
      },
      text: 'Зарегистрироваться',
    });

    const authButton = new ButtonText({
      attrs: {
        as: 'a',
        href: '/login',
        class: ['m__l-auto', 'm__r-auto'],
      },
      text: 'Войти',
    });

    const handleSubmitForm = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(
        event.target as HTMLFormElement,
      ) as RegistrationDataType;
      controller.registration(formData);
    };

    const form = new Form({
      title: 'Регистрация',
      content: {
        emailInput,
        loginInput,
        firstNameInput,
        secondNameInput,
        phoneInput,
        passwordInput,
        repeatPassword,
      },
      buttons: { registrationButton, authButton },
      events: {
        submit: handleSubmitForm,
      },
    });

    super({ content: form });
  }
}

export { Registration };
