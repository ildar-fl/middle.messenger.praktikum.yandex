import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';
import { prepareForm } from '../../utils';

function getLoginPage() {
  const nameInput = new TextInput({
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

  const handleSubmitForm = (event: SubmitEvent) => {
    event.preventDefault();

    console.log(prepareForm(event.target as HTMLFormElement));
  };

  const form = new Form({
    title: 'Вход',
    attrs: {
      name: 'loginForm',
    },
    content: { nameInput, passwordInput },
    buttons: { authButton, registrationButton },
    events: {
      submit: handleSubmitForm,
    },
  });

  return new CenteredPage({ content: form });
}

export { getLoginPage };
