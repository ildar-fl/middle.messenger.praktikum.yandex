import { v4 as uuid } from 'uuid';
import './style.scss';
import { Block, IBaseProps } from '../../core';
import { ClassNames } from '../../utils';

interface IInputProps extends IBaseProps {
  attrs: {
    labelId?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    class?: string;
    error?: boolean;
    title?: string;
  };
}

class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    const { attrs, ...other } = props;

    const { class: className, ...otherAttrs } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('base-input');

    super('input', {
      ...other,
      attrs: {
        ...otherAttrs,
        class: classNames.getClass(),
      },
    });
  }
}

interface ITextInput extends IBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  value?: string;
  error?: boolean | string | null;
}

interface ITextInputInner extends IBaseProps {
  label?: string;
  input: Input;
  error?: boolean | string | null;
}

class TextInput extends Block<ITextInputInner> {
  input;

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

    const input = new Input({
      events,
      attrs: { labelId, type, name, placeholder, value },
    });

    super('div', {
      label,
      attrs: {
        class: 'input-container',
      },
      input,
    });

    this.input = input;
  }

  setProps(props: Partial<ITextInput>) {
    const { label, error, attrs, events } = props;

    if (label || attrs) {
      super.setProps({ label, attrs });
    }

    if (events) {
      this.input.setProps({ events });
    }

    if (typeof error !== 'undefined') {
      this.input.setProps({
        attrs: { error: !!error },
      });
      super.setProps({ error });
    }
  }

  render(): DocumentFragment {
    return this.compile(
      `
        {{#if label}}
        <label id={{labelId}}>{{label}}</label>
        {{/if}}
          {{{input}}}
        {{#if error}}
          <span class='error-label'>{{error}}</span>
        {{/if}}
    `,
      this.props,
    );
  }
}

export { TextInput, Input };
