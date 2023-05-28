import './style.scss';
import { CenteredPage } from '../../layouts';
import { ButtonText } from '../../ui';
import { ROUTS } from '../../common/constants';
import { AuthController } from '../../controllers/authConroller';
import { connect } from '../../core/store';
import { ProfileComponent, ProfileContainer } from './components';
import { UserModel, UserType } from '../../common/types';

const userList: {
  key: string;
  value: keyof UserType;
  inputName: string;
  type: string;
}[] = [
  {
    key: 'Почта',
    value: UserModel.email,
    inputName: 'email',
    type: 'email',
  },
  { key: 'Логин', value: UserModel.login, inputName: 'login', type: 'text' },
  {
    key: 'Имя',
    value: UserModel.firstName,
    inputName: 'first_name',
    type: 'text',
  },
  {
    key: 'Фамилия',
    value: UserModel.secondName,
    inputName: 'second_name',
    type: 'text',
  },
  {
    key: 'Имя в чате',
    value: UserModel.displayName,
    inputName: 'display_name',
    type: 'text',
  },
  {
    key: 'Телефон',
    value: UserModel.phone,
    inputName: 'phone',
    type: 'phone',
  },
];

class ProfileInner extends CenteredPage {
  private logoutButton;
  private authController;
  private profile;

  constructor(props: any) {
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
        class: ['fs__13', 'colors__red'],
      },
    });

    const { user } = props as { user: UserType };

    const profile = new ProfileComponent({
      name: user[UserModel.firstName],
      userInfo: userList.map(({ value, ...other }) => ({
        ...other,
        value: user[value],
      })),
      changeProfileButton,
      changePasswordButton,
      logoutButton,
    });

    super({
      content: new ProfileContainer({
        content: profile,
      }),
    });

    this.profile = profile;
    this.logoutButton = logoutButton;
    this.authController = new AuthController();
  }

  init() {
    this.logoutButton.setProps({
      events: {
        click: this.onLogout.bind(this),
      },
    });
  }

  setProps(nextProps: any) {
    const { user } = nextProps as { user: UserType };

    this.profile.setProps({ name: user[UserModel.firstName] });
  }

  onLogout() {
    this.authController.logout();
  }
}

const Profile = connect(({ user }) => ({
  user: user?.data ?? {},
}))(ProfileInner);

export { Profile };
