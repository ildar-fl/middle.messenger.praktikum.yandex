import Handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import './style.scss';
import { Block, IBaseProps } from '../../core';

const TextInputTemplate = `
  <div class="input-container">
    {{#if label}}
    <label id={{labelId}}>{{label}}</label>
    {{/if}}
    <input id="{{id}}" for="{{labelId}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}">
  </div>  
`;

function createInput({
  id,
  labelId = 'forInput',
  label,
  placeholder,
  type = 'text',
  name,
}: any) {
  const template = Handlebars.compile(TextInputTemplate);

  return template({ id, labelId, label, placeholder, type, name });
}

interface IInputProps extends IBaseProps {
  attrs: {
    labelId: string;
    type: string;
    name: string;
    placeholder: string;
    value?: string;
  };
}

class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super('input', props);
  }
}

interface ITextInput extends IBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  value?: string;
}

interface ITextInputInner extends IBaseProps {
  label?: string;
  input: Input;
}

class TextInput extends Block<ITextInputInner> {
  constructor(props: ITextInput) {
    const {
      label,
      type = 'text',
      name,
      placeholder = '',
      value,
      events,
    } = props;
    const labelId = uuid();

    super('div', {
      label,
      attrs: {
        class: 'input-container',
      },
      input: new Input({
        events,
        attrs: { labelId, type, name, placeholder, value },
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
        {{#if label}}
        <label id={{labelId}}>{{label}}</label>
        {{/if}}
        {{{input}}}
    `,
      this.props,
    );
  }
}

export { createInput, TextInput };
