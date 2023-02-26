import './style.scss';
import { Block, IBaseProps } from '../../core';
import { Input } from '../../ui';

const ConversationTemplate = `
  <header class="conversation__user-info">
      <div class="user-info__avatar user-avatar"></div>
      <div class="user-info__author">{{author}}</div>
  </header>
  <div class="conversation__user-message">
      
  </div>
  <form class="conversation__user-send">
      {{{messageInput}}}
      <button type="submit">-></button>
  </form>
`;

interface IConversationProps extends IBaseProps {
  author: string;
  messageInput: any;
}

class Conversation extends Block<IConversationProps> {
  constructor(props: IConversationProps) {
    super('div', { ...props, attrs: { class: 'conversation' } });
  }

  render(): DocumentFragment {
    return this.compile(ConversationTemplate, this.props);
  }
}

function getConversation() {
  const messageInput = new Input({
    attrs: {
      name: 'message',
    },
  });

  return new Conversation({ author: 'Фасхетдинов Ильдар', messageInput });
}

export { getConversation };
