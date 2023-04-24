import { TextInput, Button, ButtonText, Form } from '../../ui';
import { CenteredPage } from '../../layouts';
import { prepareForm } from '../../utils';
import {
  RegistrationController,
  IRegistrationModel,
  REGISTRATION_MODEL,
} from '../../controllers/registration';

class Registration extends CenteredPage {
  constructor() {
    const emailInput = new TextInput({
      placeholder: 'Почта',
      name: REGISTRATION_MODEL.email,
      value: 'ildaryxa@gmail.com', // todo remove it
    });

    const loginInput = new TextInput({
      placeholder: 'Логин',
      name: REGISTRATION_MODEL.login,
      value: 'ildaryxa', // todo remove it
    });

    const firstNameInput = new TextInput({
      placeholder: 'Имя',
      name: REGISTRATION_MODEL.firstName,
      value: 'Ildar', // todo remove it
    });

    const secondNameInput = new TextInput({
      placeholder: 'Фамилия',
      name: REGISTRATION_MODEL.secondName,
      value: 'Fashet', // todo remove it
    });

    const phoneInput = new TextInput({
      placeholder: 'Телефон',
      type: 'phone',
      name: REGISTRATION_MODEL.phone,
      value: '89124897471', // todo remove it
    });

    const passwordInput = new TextInput({
      placeholder: 'Пароль',
      name: REGISTRATION_MODEL.password,
      type: 'password',
      value: 'Password1', // todo remove it
    });

    const repeatPassword = new TextInput({
      placeholder: 'Пароль (еще раз)',
      name: REGISTRATION_MODEL.repeatPassword,
      type: 'password',
      value: 'Password1', // todo remove it
    });

    const controller = new RegistrationController({
      [REGISTRATION_MODEL.login]: errorMessage => {
        loginInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.email]: errorMessage => {
        emailInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.password]: errorMessage => {
        passwordInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.firstName]: errorMessage => {
        firstNameInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.secondName]: errorMessage => {
        secondNameInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.phone]: errorMessage => {
        phoneInput.setProps({ error: errorMessage });
      },
      [REGISTRATION_MODEL.repeatPassword]: errorMessage => {
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
      ) as IRegistrationModel;
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
