import Handlebars from 'handlebars'
import './style.scss';
import { createUserItem } from './UserItem';
import usersMockData from './users.json';
import { ROUTS } from '../../constants';

const ChatsTemplate = `
  <div class="chat">
    <div class="chat__side-panel">
        <div class="side-panel__header">
            <div class="header__profile">
                <a href="${ROUTS.PROFILE}">Профиль ></a>
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
    </div>
    <div class="chat__window">{{{content}}}</div>
  </div>
`;

function createChatsPage() {
  const chatTemplate = Handlebars.compile(ChatsTemplate);

  const userData = JSON.parse(usersMockData);

  return chatTemplate({
    userItems: [],
  });
}

export { createChatsPage }