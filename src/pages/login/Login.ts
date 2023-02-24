import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';

function getLoginForm() {
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

  const form = new Form({
    title: 'Вход',
    content: { nameInput, passwordInput },
    buttons: { authButton, registrationButton },
  });

  return new CenteredPage({ content: form });
}

export { getLoginForm };
