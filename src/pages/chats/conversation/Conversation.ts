import '../style.scss';
import { Block, IBaseProps } from '../../../core';
import { SendMessageForm } from './SendMessageForm';
import { prepareForm } from '../../../utils';

const ConversationTemplate = `
  <header class="conversation__user-info">
      <div class="user-info__avatar user-avatar"></div>
      <div class="user-info__author">{{author}}</div>
  </header>
  <div class="conversation__user-message">
      
  </div>
  {{{sendMessageForm}}}
`;

interface IConversationProps extends IBaseProps {
  author: string;
  sendMessageForm: any;
}

class Conversation extends Block<IConversationProps> {
  constructor() {
    const handleSubmitSendMessageForm = (event: SubmitEvent) => {
      event.preventDefault();

      console.log(prepareForm(event.target as HTMLFormElement));
    };

    const sendMessageForm = new SendMessageForm({
      events: {
        submit: handleSubmitSendMessageForm,
      },
    });

    super('div', {
      author: 'Фасхетдинов Ильдар',
      sendMessageForm,
      attrs: { class: 'conversation' },
    });
  }

  render(): DocumentFragment {
    return this.compile(ConversationTemplate, this.props);
  }
}

export { Conversation };
