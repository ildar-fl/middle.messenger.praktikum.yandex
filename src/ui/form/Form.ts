import './style.scss';
import { Block, IBaseProps } from '../../core';

interface IContentProps extends IBaseProps {
  class: string;
  template: string;
  children: Record<string, Block>;
}

interface IContentInnerProps extends IBaseProps {
  attrs: {
    class: string;
  };
  template: string;
}

class Content extends Block<IContentInnerProps> {
  constructor(props: IContentProps) {
    const { class: className, children, ...other } = props;

    super('div', { ...other, ...children, attrs: { class: className } });
  }

  render(): DocumentFragment {
    return this.compile(this.props.template, this.props);
  }
}

interface IForm extends IBaseProps {
  title: string;
  content: Record<string, any>;
  buttons: Record<string, any>;
}

interface IFormInner extends IBaseProps {
  title: string;
  content: Content;
  buttons: Content;
}

class Form extends Block<IFormInner> {
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
