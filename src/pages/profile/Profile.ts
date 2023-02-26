import './style.css';
import { CenteredPage } from '../../layouts';
import { Button, ButtonText, Input } from '../../ui';
import { ROUTS } from '../../constants';
import { Block, IBaseProps } from '../../core';
import { prepareForm } from '../../utils';

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
    <a class="profile-page__back-button" href="${ROUTS.CHATS}"><- Назад</a>
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

class Profile extends Block<IProfileProps> {
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

function getProfilePage() {
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

  const profile = new Profile({
    name: 'Ильдар',
    userInfo: userInfoMock,
    changeProfileButton,
    changePasswordButton,
    logoutButton,
  });

  const profileContainer = new ProfileContainer({
    content: profile,
  });

  return new CenteredPage({
    content: profileContainer,
  });
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

class EditProfile extends Block<IEditProfileProps> {
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

function getEditProfilePage() {
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

  const handleSubmitEditProfile = (event: SubmitEvent) => {
    event.preventDefault();

    console.log(prepareForm(event.target as HTMLFormElement));
  };

  const editProfile = new EditProfile({
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

  return new CenteredPage({
    content: profileContainer,
  });
}

export { getProfilePage, getEditProfilePage };
