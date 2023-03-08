import './style.css';
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

interface IEditProfileProps extends IBaseProps {
  avatarInput: any;
  emailInput: any;
  nameInput: any;
  secondInput: any;
  loginInput: any;
  displayInput: any;
  phoneInput: any;
  saveProfileButton: any;
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
          <div class="user-info__container">
              <dt>Почта</dt>
              <dd>
                {{{emailInput}}}
              </dd>
          </div>
          <div class="user-info__container">
              <dt>Логин</dt>
              <dd>
                {{{loginInput}}}
              </dd>
          </div>
          <div class="user-info__container">
              <dt>Имя</dt>
              <dd>
                {{{nameInput}}}
              </dd>
          </div>
          <div class="user-info__container">
              <dt>Фамилия</dt>
              <dd>
                {{{secondInput}}}
              </dd>
          </div>
          <div class="user-info__container">
              <dt>Имя в чате</dt>
              <dd>
                {{{displayInput}}}
              </dd>
          </div>
          <div class="user-info__container">
              <dt>Телефон</dt>
              <dd>
                {{{phoneInput}}}
              </dd>
          </div>
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

    const emailInput = new Input({
      attrs: {
        name: 'email',
        type: 'email',
        value: 'ildaryxa@gmail.com',
        class: 'profile-edit-input',
      },
    });

    const nameInput = new Input({
      attrs: {
        name: 'first_name',
        type: 'text',
        value: 'Ильдар',
        class: 'profile-edit-input',
      },
    });

    const secondInput = new Input({
      attrs: {
        name: 'second_name',
        type: 'text',
        value: 'Фасхетдинов',
        class: 'profile-edit-input',
      },
    });

    const loginInput = new Input({
      attrs: {
        name: 'login',
        type: 'text',
        value: 'ildaryxa',
        class: 'profile-edit-input',
      },
    });

    const displayInput = new Input({
      attrs: {
        name: 'display_name',
        type: 'text',
        value: 'Ильдар',
        class: 'profile-edit-input',
      },
    });

    const phoneInput = new Input({
      attrs: {
        name: 'phone',
        type: 'phone',
        value: '+7 912 489 74 71',
        class: 'profile-edit-input',
      },
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
        loginInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        emailInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        nameInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        secondInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
        phoneInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
      },
      inputs: {
        login: errorMessage => {
          loginInput.setProps({
            attrs: { error: !!errorMessage, title: errorMessage },
          });
        },
        email: errorMessage => {
          emailInput.setProps({
            attrs: { error: !!errorMessage, title: errorMessage },
          });
        },
        first_name: errorMessage => {
          nameInput.setProps({
            attrs: { error: !!errorMessage, title: errorMessage },
          });
        },
        second_name: errorMessage => {
          secondInput.setProps({
            attrs: { error: !!errorMessage, title: errorMessage },
          });
        },
        phone: errorMessage => {
          phoneInput.setProps({
            attrs: { error: !!errorMessage, title: errorMessage },
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
      emailInput,
      nameInput,
      secondInput,
      loginInput,
      displayInput,
      phoneInput,
      saveProfileButton,
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
