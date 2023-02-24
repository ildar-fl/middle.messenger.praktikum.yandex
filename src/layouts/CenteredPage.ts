import Handlebars from 'handlebars';
import './style.scss';
import { Block, IBaseProps } from '../core';
import { ClassNames } from '../utils';

const CenteredPageTemplate = `
    <main class="centered-page-container {{classNames}}">
        {{{content}}}
    </main>
`;

function createCenteredPage({ classNames, content }: any) {
  const templateHome = Handlebars.compile(CenteredPageTemplate);

  return templateHome({ classNames, content });
}

interface ICenteredPage extends IBaseProps {
  attrs?: {
    class?: string | string[];
  };
  content: any;
}

class CenteredPage extends Block<IBaseProps> {
  constructor(props: ICenteredPage) {
    const classNames = new ClassNames(props.attrs?.class);
    classNames.addClassName('centered-page-container');

    super('main', {
      ...props,
      attrs: { ...props.attrs, class: classNames.getClass() },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{{content}}}', this.props);
  }
}

export { createCenteredPage, CenteredPage };
