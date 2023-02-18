import Handlebars from 'handlebars';
import './style.scss';

const ConversationTemplate = `
    <div class="conversation">
        <header class="conversation__user-info">
            <div class="user-info__avatar user-avatar"></div>
            <div class="user-info__author">{{author}}</div>
        </header>
        <div class="conversation__user-message">
            
        </div>
        <form class="conversation__user-send">
            <input id="message" placeholder="Сообщение" name="message" />
            <button type="submit">-></button>
        </form>
    </div>
`;

function createConversation({ firstName, secondNane }: any) {
  const template = Handlebars.compile(ConversationTemplate);

  return template({ author: `${firstName ?? ''} ${secondNane ?? ''}` });
}

export { createConversation };