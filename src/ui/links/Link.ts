import { Block, Router } from '../../core';
import { ClassNames } from '../../utils';
import './style.scss';

type LinkProps = {
  to: string;
  text: string;
  attrs?: {
    class?: string | string[];
  };
  target?: '_blank' | '_self';
};

type LinkInnerProps = {
  text: string;
};

class Link extends Block<LinkInnerProps> {
  constructor(props: LinkProps) {
    const { attrs = {}, to, target = '_self', text } = props;

    const { class: className } = attrs;

    const classNames = new ClassNames(className);
    classNames.addClassName('link');

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      Router.__instance.go(to);
    };

    super('a', {
      text,
      attrs: { href: to, target, class: classNames.getClass() },
      events: { click: handleClick },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{text}}', this.props);
  }
}

export { Link };
