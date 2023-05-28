import './style.scss';
import { parseStyle, ClassNames } from '../../utils';
import { Block } from '../../core';

type ButtonProps = {
  attrs: {
    type?: string;
    class?: string | string[];
    style?: Record<string, string>;
    disabled?: boolean;
  };
  text: string;
};

type ButtonPropsInner = {
  attrs: {
    type?: string;
    class?: string;
    style?: string;
    disabled?: string;
  };
  text: string;
};

class Button extends Block<ButtonPropsInner> {
  constructor(props: ButtonProps) {
    const { attrs, text, ...other } = props;

    const { class: className, style, disabled, ...otherAttrs } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('button');

    super('button', {
      ...other,
      attrs: {
        ...otherAttrs,
        disabled: disabled ? 'true' : undefined,
        class: classNames.getClass(),
        style: parseStyle(style),
      },
      text,
    });
  }

  render(): DocumentFragment {
    const { text } = this.props;

    return this.compile('{{text}}', { text });
  }
}

interface IButtonTextProps {
  attrs: {
    as?: 'button' | 'a';
    href?: string;
    disabled?: boolean;
    class?: string | string[];
    style?: Record<string, string>;
  };
  text: string;
}

type ButtonTextInnerProps = {
  attrs: {
    as?: 'button' | 'a';
    href?: string;
    disabled?: boolean;
    class: string;
    style?: string;
  };
  text: string;
};

class ButtonText extends Block<ButtonTextInnerProps> {
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

export { Button, ButtonText };
