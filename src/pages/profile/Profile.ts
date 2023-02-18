import Handlebars from 'handlebars';
import './style.css';
import { createCenteredPage } from '../../layouts';
import { createButton, createButtonText, flexContainer } from '../../ui';
import { ROUTS } from '../../constants';

const ProfileContainerTemplate = `
    <a class="profile-page__back-button" href="${ROUTS.CHATS}"><- Назад</a>
    <section class="profile-page__user">
        {{{content}}}
    </section>
`;

const ProfileTemplate = `
    <section class="profile">
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
    </section>
`;

const ProfileEditTemplate = `
    <section class="profile">
        <header class="profile-header">
            <input class="profile-header__avatar" name="avatar"/>
        </header>
        <dl>
            {{#each userInfo}}
                <div class="user-info__container">
                    <dt>{{key}}</dt>
                    <dd><input value="{{value}}" name="{{inputName}}" type="{{type}}" class="profile-edit-input"/></dd>
                </div>
            {{/each}}
        </dl>
        {{{saveProfileButton}}}
    </section>
`;

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

function createProfile() {
  const templateProfilePage = Handlebars.compile(ProfileContainerTemplate);
  const templateProfileStr = Handlebars.compile(ProfileTemplate)({
    name: 'Ильдар',
    userInfo: userInfoMock,
    changeProfileButton: createButtonText({
      title: 'Изменить данные',
      as: 'a',
      href: ROUTS.PROFILE_EDIT,
      classNames: 'fs__13',
    }),
    changePasswordButton: createButtonText({
      title: 'Изменить пароль',
      as: 'a',
      disabled: true,
      href: ROUTS.PROFILE_PASSWORD_EDIT,
      classNames: 'fs__13',
    }),
    logoutButton: createButtonText({
      title: 'Выйти',
      as: 'a',
      href: ROUTS.LOGIN,
      classNames: ['fs__13', 'colors__red'],
    }),
  });

  const profileStr = templateProfilePage({
    content: templateProfileStr,
  });

  return createCenteredPage({
    classNames: 'profile-page',
    content: profileStr,
  });
}

function createEditProfile() {
  const templateProfileEditPage = Handlebars.compile(ProfileContainerTemplate);
  const templateProfileEditStr = Handlebars.compile(ProfileEditTemplate)({
    userInfo: userInfoMock,
    saveProfileButton: flexContainer({
      content: createButton({
        style: { width: '280px' },
        title: 'Сохранить',
      }),
    }),
  });

  const profileStr = templateProfileEditPage({
    content: templateProfileEditStr,
  });

  return createCenteredPage({
    classNames: 'profile-page',
    content: profileStr,
  });
}

export { createProfile, createEditProfile };
