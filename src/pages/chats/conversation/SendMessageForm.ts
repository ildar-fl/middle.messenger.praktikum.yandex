import { Block, IBaseProps } from '../../../core';
import { Input } from '../../../ui';

interface ISendMessageFormProps extends IBaseProps {
  messageInput: any;
}

class SendMessageForm extends Block<ISendMessageFormProps> {
  constructor(props: IBaseProps = {}) {
    const messageInput = new Input({
      attrs: {
        name: 'message',
      },
    });

    super('form', {
      ...props,
      messageInput,
      attrs: {
        class: 'conversation__user-send',
        name: 'sendMessageForm',
        ...props.attrs,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
    {{{messageInput}}}
      <button type="submit">-></button>
    `,
      this.props,
    );
  }
}

export { SendMessageForm };
