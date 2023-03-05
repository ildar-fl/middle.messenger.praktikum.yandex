import { Form, TextInput, Button, ButtonText } from '../../ui';
import { CenteredPage } from '../../layouts';
import {
  prepareForm,
  ConfigType,
  ValidateMethod,
  useValidator,
} from '../../utils';

const LOGIN_CONFIG: ConfigType = {
  login: {
    [ValidateMethod.Min]: {
      value: 3,
      message: 'Логин должен состоять минимум из 3х символов',
    },
    [ValidateMethod.Max]: {
      value: 20,
      message: 'Логин не должен состоять больше 20ти символов',
    },
    [ValidateMethod.Login]: {
      message: 'Допустимы латинские символы,цифры, дефис и _',
    },
    [ValidateMethod.NotOnlyNumerals]: {
      message: 'Логин не должен состоять только из цифр',
    },
  },
  password: {
    [ValidateMethod.Min]: {
      value: 8,
      message: 'Пароль должен состоять минимум из 8ми символов',
    },
    [ValidateMethod.Max]: {
      value: 40,
      message: 'Пароль не должен состоять больше 40ка символов',
    },
    [ValidateMethod.CapitalSymbol]: {
      message: 'Пароль должен содержать хотя бы один заглавный символ',
    },
    [ValidateMethod.ContainDigit]: {
      message: 'Пароль должен содержать хотя бы одну цифру',
    },
  },
};

function getLoginPage() {
  const loginInput = new TextInput({
    placeholder: 'Логин',
    name: 'login',
  });

  const passwordInput = new TextInput({
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
  });

  const { checkData } = useValidator(LOGIN_CONFIG, {
    init: ({ checkInput }) => {
      loginInput.setProps({ events: { blur: checkInput } });
      passwordInput.setProps({ events: { blur: checkInput } });
    },
    inputs: {
      login: errorMessage => {
        loginInput.setProps({ error: errorMessage });
      },
      password: errorMessage => {
        passwordInput.setProps({ error: errorMessage });
      },
    },
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
    const formData = prepareForm(event.target as HTMLFormElement);
    checkData(formData);
    console.log(formData);
  };

  const form = new Form({
    title: 'Вход',
    attrs: {
      name: 'loginForm',
    },
    content: { loginInput, passwordInput },
    buttons: { authButton, registrationButton },
    events: {
      submit: handleSubmitForm,
    },
  });

  return new CenteredPage({ content: form });
}

export { getLoginPage };
