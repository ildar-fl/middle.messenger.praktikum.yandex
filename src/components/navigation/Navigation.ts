import './style.scss';
import { Link } from '../../ui';
import { Block } from '../../core';
import { ROUTS } from '../../constants';

const NAVIGATIONS = [
  { text: 'Авторизация', to: ROUTS.LOGIN },
  { text: 'Регистрация', to: ROUTS.REGISTRATION },
  { text: 'Чаты', to: ROUTS.CHATS },
  { text: 'Профиль', to: ROUTS.PROFILE },
  { text: 'Редактирование профиля', to: ROUTS.PROFILE_EDIT },
  { text: 'Страница не найдена', to: ROUTS.NOT_FOUND },
  { text: 'Внутренняя ошибка', to: ROUTS.INTERNAL_ERROR },
];

type NavigationProps = {
  navigation: Link[];
};

class Navigation extends Block<NavigationProps> {
  constructor() {
    const navigation = NAVIGATIONS.map(props => new Link(props));

    super('nav', { navigation, attrs: { class: 'navigation' } });
  }

  render(): DocumentFragment {
    return this.compile(
      `
      <ul>
      {{#each navigation}}
         <li>{{{this}}}</li>
      {{/each}}
      </ul>
    `,
      this.props,
    );
  }
}

export { Navigation };
