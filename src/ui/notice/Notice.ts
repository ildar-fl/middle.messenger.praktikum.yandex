import './style.scss';
import { Block } from '../../core';
import { ClassNames, parseStyle } from '../../utils';

type NoticeProps = {
  text?: string;
  type?: 'secondary' | 'error';
  attrs?: {
    class?: string | string[];
    style?: Record<string, string>;
  };
};

type NoticeInnerProps = {
  attrs: {
    class?: string;
    style?: string;
  };
  text?: string;
};

class Notice extends Block<NoticeInnerProps> {
  constructor(props: NoticeProps = {}) {
    const { attrs = {}, text, type = 'secondary' } = props;

    const { class: className, style } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('notice');
    classNames.addClassName(type);

    super('div', {
      attrs: {
        class: classNames.getClass(),
        style: parseStyle(text ? style : { display: 'none' }),
      },
      text,
    });
  }

  setProps(nextProps: Partial<NoticeInnerProps>) {
    const { text } = nextProps;

    if (text) {
      super.setProps({
        text,
        attrs: {
          style: '',
        },
      });
    } else {
      super.setProps({
        text: '',
        attrs: {
          style: parseStyle({ display: 'none' }),
        },
      });
    }
  }

  render(): DocumentFragment {
    const { text } = this.props;

    return this.compile('{{text}}', { text });
  }
}

export { Notice };
