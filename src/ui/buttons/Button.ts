import './style.scss';
import { parseStyle, compile, ClassNames } from '../../utils';
import { Block, IBaseProps } from '../../core';

const ButtonTemplate = `
    <button id="{{id}}" class="button" style="{{style}}" type="{{type}}">
        {{text}}
    </button>
`;

// deprecated
interface IButtonPropsOld {
  id?: string;
  title: string;
  style?: Record<string, string>;
  type?: string;
}

function createButton({
  id = '',
  title,
  style,
  type = 'button',
}: IButtonPropsOld) {
  return compile(ButtonTemplate, {
    id,
    text: title,
    style: parseStyle(style),
    type,
  });
}

interface IButtonProps extends IBaseProps {
  attrs: {
    class?: string;
    style?: Partial<CSSStyleDeclaration>;
    type?: string;
  };
  text: string;
}

class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super('button', { ...props, attrs: { ...props.attrs, class: 'button' } });
  }

  render(): DocumentFragment {
    const { text } = this.props;

    return this.compile('{{text}}', { text });
  }
}

interface IButtonTextProps extends IBaseProps {
  attrs: {
    as?: 'button' | 'a';
    href?: string;
    disabled?: boolean;
    class?: string | string[];
    style?: Record<string, string>;
  };
  text: string;
}

interface IButtonTextInnerProps extends IBaseProps {
  attrs: {
    as?: 'button' | 'a';
    href?: string;
    disabled?: boolean;
    class: string;
    style?: string;
  };
  text: string;
}

class ButtonText extends Block<IButtonTextInnerProps> {
  constructor(props: IButtonTextProps) {
    const { attrs, text, ...other } = props;

    const { as = 'button', class: className, style, ...otherAttrs } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('button-text');

    super(as, {
      ...other,
      attrs: {
        as,
        class: classNames.getClass(),
        style: parseStyle(style),
        ...otherAttrs,
      },
      text,
    });
  }

  render(): DocumentFragment {
    const { text } = this.props;

    return this.compile('{{text}}', { text });
  }
}

export { createButton, Button, ButtonText };
