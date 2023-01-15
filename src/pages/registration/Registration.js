import Handlebars from 'handlebars'
import { createForm, createInput, createButton, createButtonText } from '../../ui';
import { createCenteredPage } from '../../layouts';

const LoginTemplate = `
  {{{emailInput}}}
  {{{loginInput}}}
  {{{firstNameInput}}}
  {{{surnameInput}}}
  {{{phoneInput}}}
  {{{passwordInput}}}
  {{{repeatPassword}}}
`;

const ButtonsTemplate = `
  {{{registrationButton}}}
  {{{authButton}}}
`;

function createRegistrationForm() {
    const formTemplate = createForm({
        title: 'Регистрация',
        content: Handlebars.compile(LoginTemplate)({
            emailInput: createInput({ id: 'email', placeholder: 'Почта', name: 'email' }),
            loginInput: createInput({ id: 'login', placeholder: 'Логин', name: 'login' }),
            firstNameInput: createInput({ id: 'first_name', placeholder: 'Имя', name: 'first_name' }),
            secondNameInput: createInput({ id: 'second_name', placeholder: 'Фамилия', name: 'second_name' }),
            phoneInput: createInput({ id: 'phone', placeholder: 'Телефон', type: 'phone', name: 'phone' }),
            passwordInput: createInput({ id: 'password', placeholder: 'Пароль', name: 'password', type: 'password' }),
            repeatPassword: createInput({ id: 'repeat_password', placeholder: 'Пароль (еще раз)', name: 'repeat_password', type: 'password' }),
        }),
        buttons: Handlebars.compile(ButtonsTemplate)({
            registrationButton: createButton({id: 'registration_button', title: 'Зарегистрироваться', type: 'submit'}),
            authButton: createButtonText({id: 'auth_button', as: 'a', href: '/login', title: 'Войти'}),
        }),
    });

    return createCenteredPage({ content: formTemplate });
}

export { createRegistrationForm };

