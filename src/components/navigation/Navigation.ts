import './style.scss';
import { Block, IBaseProps } from '../../core';
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

interface INavigationProps extends IBaseProps {
  navigation: Array<{ text: string; to: string }>;
}

class Navigation extends Block<INavigationProps> {
  constructor() {
    super('nav', { navigation: NAVIGATIONS, attrs: { class: 'navigation' } });
  }

  render(): DocumentFragment {
    return this.compile(
      `
      <ul>
      {{#each navigation}}
         <li><a href='{{to}}'>{{text}}</a></li>
      {{/each}}
      </ul>
    `,
      this.props,
    );
  }
}

export { Navigation };
