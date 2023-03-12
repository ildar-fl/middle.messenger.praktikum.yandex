import './style.scss';
import { Block } from '../../core';

type ErrorCodeProps = {
  code: string;
  description: string;
  button: Block;
};

class ErrorCode extends Block<ErrorCodeProps> {
  constructor(props: ErrorCodeProps) {
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
