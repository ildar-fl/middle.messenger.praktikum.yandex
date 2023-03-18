import { Block, Router } from '../../core';

type LinkProps = {
  to: string;
  text: string;
  target?: '_blank' | '_self';
};

type LinkInnerProps = {
  text: string;
};

class Link extends Block<LinkInnerProps> {
  constructor(props: LinkProps) {
    const { to, target = '_self', text } = props;

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      Router.__instance.go(to);
    };

    super('a', {
      text,
      attrs: { href: to, target },
      events: { click: handleClick },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{text}}', this.props);
  }
}

export { Link };
