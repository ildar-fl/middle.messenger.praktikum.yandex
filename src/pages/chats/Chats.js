import Handlebars from 'handlebars'
import './style.scss';
import { createUserItem } from './UserItem';
import usersMockData from './users.json';
import { ROUTS } from '../../constants';
import { createConversation } from "./Conversation";

const ChatsTemplate = `
  <main class="chat">
    <section class="chat__side-panel">
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
    </section>
    <section class="chat__window">{{{content}}}</section>
  </main>
`;

function createChatsPage() {
  const chatTemplate = Handlebars.compile(ChatsTemplate);

  return chatTemplate({
    userItems: usersMockData.map(({
                                first_name,
                                second_nane,
                                message,
                                time,
                                count
                              }) =>
        createUserItem({
          firstName: first_name,
          secondNane: second_nane,
          message,
          time,
          count
        })),
    content: createConversation({ firstName: 'Владислав' })
  });
}

export { createChatsPage }