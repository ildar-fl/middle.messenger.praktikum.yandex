import './style.scss';
import { parseStyle, ClassNames } from '../../utils';
import { Block, IBaseProps } from '../../core';

interface IButtonProps extends IBaseProps {
  attrs: {
    type?: string;
    class?: string | string[];
    style?: Record<string, string>;
  };
  text: string;
}

interface IButtonPropsInner extends IBaseProps {
  attrs: {
    type?: string;
    class?: string;
    style?: string;
  };
  text: string;
}

class Button extends Block<IButtonPropsInner> {
  constructor(props: IButtonProps) {
    const { attrs, text, ...other } = props;

    const { class: className, style, ...otherAttrs } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('button');

    super('button', {
      ...other,
      attrs: {
        ...otherAttrs,
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

export { Button, ButtonText };
