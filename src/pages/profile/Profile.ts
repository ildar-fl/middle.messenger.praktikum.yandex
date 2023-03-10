import './style.scss';
import { CenteredPage } from '../../layouts';
import { Button, ButtonText, Input } from '../../ui';
import { ROUTS } from '../../constants';
import { Block, IBaseProps } from '../../core';
import {
  ConfigType,
  INPUT_CONFIGS,
  prepareForm,
  useValidator,
} from '../../utils';

const EDIT_PROFILE_CONFIG: ConfigType = {
  login: INPUT_CONFIGS.login,
  email: INPUT_CONFIGS.email,
  first_name: INPUT_CONFIGS.name,
  second_name: INPUT_CONFIGS.name,
  phone: INPUT_CONFIGS.phone,
};

const userInfoMock = [
  {
    key: 'Почта',
    value: 'ildaryxa@gmail.com',
    inputName: 'email',
    type: 'email',
  },
  { key: 'Логин', value: 'ildaryxa', inputName: 'login', type: 'text' },
  { key: 'Имя', value: 'Ильдар', inputName: 'first_name', type: 'text' },
  {
    key: 'Фамилия',
    value: 'Фасхетдинов',
    inputName: 'second_name',
    type: 'text',
  },
  {
    key: 'Имя в чате',
    value: 'Ильдар',
    inputName: 'display_name',
    type: 'text',
  },
  {
    key: 'Телефон',
    value: '+7 912 489 74 71',
    inputName: 'phone',
    type: 'phone',
  },
];

interface IProfileContainer extends IBaseProps {
  content: any;
}

class ProfileContainer extends Block<IProfileContainer> {
  constructor(props: IProfileContainer) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(
      `
    <a class="profile-page__back-button" href="${ROUTS.CHATS}">Назад</a>
    <section class="profile-page__user">
        {{{content}}}
    </section>
    `,
      this.props,
    );
  }
}

interface IUserInfo {
  key: string;
  value: string;
  inputName: string;
  type: string;
}

interface IProfileProps extends IBaseProps {
  name: string;
  userInfo: Array<IUserInfo>;
  changeProfileButton: any;
  changePasswordButton: any;
  logoutButton: any;
}

class ProfileComponent extends Block<IProfileProps> {
  constructor(props: IProfileProps) {
    super('section', { ...props, attrs: { ...props.attrs, class: 'profile' } });
  }

  render(): DocumentFragment {
    return this.compile(
      `
    <header class="profile-header">
            <div class="profile-header__avatar"></div>
            <h2>{{name}}</h2>
        </header>
        <dl>
            {{#each userInfo}}
                <div class="user-info__container">
                    <dt>{{key}}</dt>
                    <dd>{{value}}</dd>
                </div>
            {{/each}}
        </dl>
        {{{changeProfileButton}}}
        {{{changePasswordButton}}}
        {{{logoutButton}}}
    `,
      this.props,
    );
  }
}

class Profile extends CenteredPage {
  constructor() {
    const changeProfileButton = new ButtonText({
      text: 'Изменить данные',
      attrs: {
        as: 'a',
        href: ROUTS.PROFILE_EDIT,
        class: 'fs__13',
      },
    });

    const changePasswordButton = new ButtonText({
      text: 'Изменить пароль',
      attrs: {
        as: 'a',
        disabled: true,
        href: ROUTS.PROFILE_PASSWORD_EDIT,
        class: 'fs__13',
      },
    });

    const logoutButton = new ButtonText({
      text: 'Выйти',
      attrs: {
        as: 'a',
        href: ROUTS.LOGIN,
        class: ['fs__13', 'colors__red'],
      },
    });

    const profile = new ProfileComponent({
      name: 'Ильдар',
      userInfo: userInfoMock,
      changeProfileButton,
      changePasswordButton,
      logoutButton,
    });

    super({
      content: new ProfileContainer({
        content: profile,
      }),
    });
  }
}

interface IProfileInputProps extends IBaseProps {
  label: string;
  name: string;
  value?: string;
  type?: string;
}

interface IProfileInputInnerProps extends IBaseProps {
  label: string;
  input: any;
  error?: boolean | string | null;
}

class ProfileInput extends Block<IProfileInputInnerProps> {
  input;

  constructor(props: IProfileInputProps) {
    const { name, type, label, value } = props;

    const input = new Input({
      attrs: {
        name,
        type,
        value,
        class: 'profile-edit-input',
      },
    });

    super('div', {
      label,
      input,
      attrs: { ...props.attrs, class: 'edit_user-info__container' },
    });

    this.input = input;
  }

  setProps(props: Partial<IProfileInputInnerProps>) {
    const { error } = props;

    if (typeof error !== 'undefined') {
      this.input.setProps({
        attrs: { error: !!error },
      });
    }

    super.setProps(props);
  }

  render(): DocumentFragment {
    return this.compile(
      `
      <div class='input-field'>
        <dt>{{label}}</dt>
        <dd>{{{input}}}</dd>
      </div>
      <div class='error-container' title='{{error}}'>{{error}}</div>
    `,
      this.props,
    );
  }
}

interface IEditProfileProps extends IBaseProps {
  avatarInput: any;
  saveProfileButton: any;
  inputs: any[];
}

class EditProfileComponent extends Block<IEditProfileProps> {
  constructor(props: IEditProfileProps) {
    super('form', {
      ...props,
      attrs: { ...props.attrs, name: 'editProfileForm', class: 'profile' },
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
        <header class="profile-header">
            {{{avatarInput}}}
        </header>
        <dl>
          {{#each inputs}}
            {{{this}}}
          {{/each}}
        </dl>
        {{{saveProfileButton}}}
    `,
      this.props,
    );
  }
}

class EditProfile extends CenteredPage {
  constructor() {
    const avatarInput = new Input({
      attrs: {
        name: 'avatar',
        class: 'profile-header__avatar',
      },
    });

    const emailInput = new ProfileInput({
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: 'ildaryxa@gmail.com',
    });

    const nameInput = new ProfileInput({
      name: 'first_name',
      type: 'text',
      value: 'Ильдар',
      label: 'Имя',
    });

    const secondInput = new ProfileInput({
      name: 'second_name',
      type: 'text',
      value: 'Фасхетдинов',
      label: 'Фамилия',
    });

    const loginInput = new ProfileInput({
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'ildaryxa',
    });

    const displayInput = new ProfileInput({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: 'Ильдар',
    });

    const phoneInput = new ProfileInput({
      label: 'Телефон',
      name: 'phone',
      type: 'phone',
      value: '+79124897471',
    });

    const saveProfileButton = new Button({
      text: 'Сохранить',
      attrs: {
        type: 'submit',
        style: { width: '280px' },
        class: ['m__l-auto', 'm__r-auto'],
      },
    });

    const { checkData } = useValidator(EDIT_PROFILE_CONFIG, {
      init: ({ checkInput }) => {
        const eventsObject = {
          events: { blur: checkInput, focus: checkInput },
        };
        loginInput.input.setProps(eventsObject);
        emailInput.input.setProps(eventsObject);
        nameInput.input.setProps(eventsObject);
        secondInput.input.setProps(eventsObject);
        phoneInput.input.setProps(eventsObject);
      },
      inputs: {
        login: errorMessage => {
          loginInput.setProps({
            error: errorMessage,
          });
        },
        email: errorMessage => {
          emailInput.setProps({
            error: errorMessage,
          });
        },
        first_name: errorMessage => {
          nameInput.setProps({
            error: errorMessage,
          });
        },
        second_name: errorMessage => {
          secondInput.setProps({
            error: errorMessage,
          });
        },
        phone: errorMessage => {
          phoneInput.setProps({
            error: errorMessage,
          });
        },
      },
    });

    const handleSubmitEditProfile = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(event.target as HTMLFormElement);
      console.log(formData);
      checkData(formData);
    };

    const editProfile = new EditProfileComponent({
      avatarInput,
      saveProfileButton,
      inputs: [
        emailInput,
        nameInput,
        secondInput,
        loginInput,
        displayInput,
        phoneInput,
      ],
      events: {
        submit: handleSubmitEditProfile,
      },
    });

    const profileContainer = new ProfileContainer({
      content: editProfile,
    });

    super({
      content: profileContainer,
    });
  }
}

export { Profile, EditProfile };
