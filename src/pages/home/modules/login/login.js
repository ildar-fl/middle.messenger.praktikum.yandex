import Handlebars from 'handlebars'
import { createForm, createInput, createButton, createButtonText } from '../../../../ui';

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
          authButton: createButton({id: 'authButton', title: 'Авторизоваться'}),
          registrationButton: createButtonText({id: 'registrationButton', title: 'Нет аккаунта?'}),
      }),
  });

  return formTemplate;
}

export { createLoginForm };

