import './style.scss';
import { UserItem } from './UserItem';
import { ROUTS } from '../../constants';
import { Conversation } from './conversation/Conversation';
import { Block, IBaseProps } from '../../core';

const usersMockData = [
  {
    avatar: 'AL',
    first_name: 'Ildar',
    second_nane: '',
    message: 'Изображение',
    time: '10:49',
    count: 9,
  },
  {
    avatar: 'AL',
    first_name: 'Anton',
    second_nane: 'Aleupov',
    message: 'Смотри Что я наделал! емае',
    time: '10:49',
    count: 4,
  },
  {
    avatar: 'AL',
    first_name: 'Чат чат чат',
    second_nane: '',
    message: 'Это техно диско мясорубка',
    time: '10:49',
    count: 1,
  },
  {
    avatar: 'AL',
    first_name: 'Ildar',
    second_nane: '',
    message: 'Изображение',
    time: '10:49',
    count: 9,
  },
];

const ChatsTemplate = `
  <section class="chat__side-panel">
      <div class="side-panel__header">
          <div class="header__profile">
              <a href="${ROUTS.PROFILE}">Профиль</a>
          </div>
          <div class="header__search">
              <input id="input_search" placeholder="Поиск" name="input_search"/>
          </div>
      </div>
      <div class="side-panel__list">
          {{#each userItems}}
              {{{this}}}
          {{/each}}
      </div>
  </section>
  <section class="chat__window">{{{content}}}</section>
`;

interface IChatsProps extends IBaseProps {
  userItems: any[];
  content: any;
}

class Chats extends Block<IChatsProps> {
  constructor() {
    const userItems = usersMockData.map(
      ({ first_name, second_nane, message, time, count }) =>
        new UserItem({
          firstName: first_name,
          secondNane: second_nane,
          message,
          time,
          count,
        }),
    );

    super('main', {
      userItems,
      content: new Conversation(),
      attrs: { class: 'chat' },
    });
  }

  render(): DocumentFragment {
    return this.compile(ChatsTemplate, this.props);
  }
}

export { Chats };
