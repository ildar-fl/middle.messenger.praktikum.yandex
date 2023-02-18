import './style.scss';
import { parseStyle, compile } from '../../utils';
import { Block, BaseProps, render } from '../../core';

const ButtonTemplate = `
    <button id="{{id}}" class="button" style="{{style}}" type="{{type}}">
        {{text}}
    </button>
`;

// deprecated
interface IButtonPropsOld {
  id?: string;
  title: string;
  style?: Partial<CSSStyleDeclaration>;
  type?: string;
}

function createButton({
  id = '',
  title,
  style,
  type = 'button',
}: IButtonPropsOld) {
  return compile(ButtonTemplate, {
    id,
    text: title,
    style: parseStyle(style),
    type,
  });
}

interface IButtonProps extends BaseProps {
  text: string;
}

class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super('button', props);
  }

  render(): DocumentFragment {
    const { text } = this.props;

    return this.compile(ButtonTemplate, { text });
  }
}

const profileTemplate = `
    <div>
    {{ userName }}
        {{{ button }}}
    </div>
`;

interface UserProfileProps extends BaseProps {
  userName: string;
  button: Button;
}

class UserProfile extends Block<UserProfileProps> {
  constructor(props: UserProfileProps) {
    super('div', props);
  }
  render() {
    return this.compile(profileTemplate, {
      userName: this.props.userName,
      button: this.props.button,
    });
  }
}

const profile = new UserProfile({
  userName: 'John Doe',
  button: new Button({
    text: 'Change name',
    events: {
      click: event => {
        console.log(event);
      },
    },
  }),
});

render('#root', profile);

export { createButton, Button };
