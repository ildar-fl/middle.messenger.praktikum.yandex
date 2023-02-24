import './style.scss';
import { Block, IBaseProps } from '../../core';

interface IErrorCodeProps extends IBaseProps {
  code: string;
  description: string;
  button: any;
}

class ErrorCode extends Block<IErrorCodeProps> {
  constructor(props: IErrorCodeProps) {
    super('div', { ...props, attrs: { class: 'error-code-container' } });
  }

  render(): DocumentFragment {
    return this.compile(
      `<h1>{{code}}</h1>
        <h2>{{description}}</h2>
        {{{button}}}`,
      this.props,
    );
  }
}

export { ErrorCode };
