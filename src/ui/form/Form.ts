import './style.scss';
import { Block, BaseProps } from '../../core';

interface IContentProps {
  class: string;
  template: string;
  children: Record<string, Block>;
}

type ContentInnerProps = {
  attrs: {
    class: string;
  };
  template: string;
};

class Content extends Block<ContentInnerProps> {
  constructor(props: IContentProps) {
    const { class: className, children, ...other } = props;

    super('div', { ...other, ...children, attrs: { class: className } });
  }

  render(): DocumentFragment {
    return this.compile(this.props.template, this.props);
  }
}

interface IForm extends BaseProps {
  title: string;
  content: Record<string, Block>;
  buttons: Record<string, Block>;
}

type FormInner = {
  title: string;
  content: Content;
  buttons: Content;
};

class Form extends Block<FormInner> {
  constructor(props: IForm) {
    const { content, buttons, attrs = {}, ...other } = props;
    const contentTemplate = Object.keys(content)
      .map(key => `{{{${key}}}}`)
      .join('');
    const buttonsTemplate = Object.keys(buttons)
      .map(key => `{{{${key}}}}`)
      .join('');

    super('form', {
      ...other,
      attrs: {
        class: 'form',
        ...attrs,
      },
      content: new Content({
        class: 'form__content',
        template: contentTemplate,
        children: content,
      }),
      buttons: new Content({
        class: 'form__buttons',
        template: buttonsTemplate,
        children: buttons,
      }),
    });
  }

  render(): DocumentFragment {
    const { title, content, buttons } = this.props;

    return this.compile(
      `<h1 class="form__title">{{title}}</h1>
    {{{content}}}
    {{{buttons}}}`,
      { title, content, buttons },
    );
  }
}

export { Form };
