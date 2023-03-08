import { TextInput, Button, ButtonText, Form } from '../../ui';
import { CenteredPage } from '../../layouts';
import {
  ConfigType,
  prepareForm,
  INPUT_CONFIGS,
  useValidator,
} from '../../utils';

const REGISTRATION_CONFIG: ConfigType = {
  login: INPUT_CONFIGS.login,
  password: INPUT_CONFIGS.password,
  email: INPUT_CONFIGS.email,
  first_name: INPUT_CONFIGS.name,
  second_name: INPUT_CONFIGS.name,
  phone: INPUT_CONFIGS.phone,
};

class Registration extends CenteredPage {
  constructor() {
    const emailInput = new TextInput({
      placeholder: 'Почта',
      name: 'email',
    });

    const loginInput = new TextInput({
      placeholder: 'Логин',
      name: 'login',
    });

    const firstNameInput = new TextInput({
      placeholder: 'Имя',
      name: 'first_name',
    });

    const secondNameInput = new TextInput({
      placeholder: 'Фамилия',
      name: 'second_name',
    });

    const phoneInput = new TextInput({
      placeholder: 'Телефон',
      type: 'phone',
      name: 'phone',
    });

    const passwordInput = new TextInput({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
    });

    const repeatPassword = new TextInput({
      placeholder: 'Пароль (еще раз)',
      name: 'repeat_password',
      type: 'password',
    });

    const { checkData } = useValidator(REGISTRATION_CONFIG, {
      init: ({ checkInput }) => {
        loginInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        emailInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        passwordInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        firstNameInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        secondNameInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        phoneInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
      },
      inputs: {
        login: errorMessage => {
          loginInput.setProps({ error: errorMessage });
        },
        email: errorMessage => {
          emailInput.setProps({ error: errorMessage });
        },
        password: errorMessage => {
          passwordInput.setProps({ error: errorMessage });
        },
        first_name: errorMessage => {
          firstNameInput.setProps({ error: errorMessage });
        },
        second_name: errorMessage => {
          secondNameInput.setProps({ error: errorMessage });
        },
        phone: errorMessage => {
          phoneInput.setProps({ error: errorMessage });
        },
      },
    });

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
      const formData = prepareForm(event.target as HTMLFormElement);
      console.log(formData);
      checkData(formData);
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
