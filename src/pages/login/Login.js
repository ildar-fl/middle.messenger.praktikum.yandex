import Handlebars from 'handlebars'
import { createForm, createInput, createButton, createButtonText } from '../../ui';
import { createCenteredPage } from '../../layouts';

const LoginTemplate = `
  {{{nameInput}}}
  {{{passwordInput}}}
`;

const ButtonsTemplate = `
  {{{authButton}}}
  {{{registrationButton}}}
`;

function createLoginForm() {
  const formTemplate = createForm({
      title: 'Вход',
      content: Handlebars.compile(LoginTemplate)({
          nameInput: createInput({ id: 'login', placeholder: 'Логин', name: 'login' }),
          passwordInput: createInput({ id: 'password', placeholder: 'Пароль', name: 'password', type: 'password' }),
      }),
      buttons: Handlebars.compile(ButtonsTemplate)({
          authButton: createButton({id: 'authButton', title: 'Авторизоваться', type: 'submit'}),
          registrationButton: createButtonText({id: 'registrationButton', as: 'a', href: '/registration', title: 'Нет аккаунта?'}),
      }),
  });

  return createCenteredPage({ content: formTemplate });
}

export { createLoginForm };

