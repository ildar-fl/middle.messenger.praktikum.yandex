import { Block, BaseProps } from '../../../core';
import { Input } from '../../../ui';
import { prepareForm, useValidator, ValidateMethod } from '../../../utils';

const MESSAGE_CONFIG = {
  message: {
    [ValidateMethod.Required]: {
      message: 'Сообщение не должно быть пустым',
    },
  },
};

type SendMessageFormProps = {
  messageInput: Block;
};

class SendMessageForm extends Block<SendMessageFormProps> {
  constructor(props: BaseProps = {}) {
    const messageInput = new Input({
      attrs: {
        name: 'message',
      },
    });

    const { checkData } = useValidator(MESSAGE_CONFIG, {
      init: ({ checkInput }) => {
        messageInput.setProps({
          events: { blur: checkInput, focus: checkInput },
        });
      },
      inputs: {
        message: errorMessage => {
          messageInput.setProps({ attrs: { error: !!errorMessage } });
        },
      },
    });

    const handleSubmitForm = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(event.target as HTMLFormElement);
      checkData(formData);
      console.log(formData);
    };

    super('form', {
      ...props,
      messageInput,
      attrs: {
        class: 'conversation__user-send',
        name: 'sendMessageForm',
        ...props.attrs,
      },
      events: {
        submit: handleSubmitForm,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
    {{{messageInput}}}
      <button type="submit">></button>
    `,
      this.props,
    );
  }
}

export { SendMessageForm };
