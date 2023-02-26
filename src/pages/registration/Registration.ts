import { TextInput, Button, ButtonText, Form } from '../../ui';
import { CenteredPage } from '../../layouts';
import { prepareForm } from '../../utils';

function getRegistrationPage() {
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

    console.log(prepareForm(event.target as HTMLFormElement));
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

  return new CenteredPage({ content: form });
}

export { getRegistrationPage };
