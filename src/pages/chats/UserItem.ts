import './style.scss';
import { Block, IBaseProps } from '../../core';

const userItemTemplate = `
  <div class="user-item__avatar user-avatar"></div>
  <div class="user-item__message">
      <div class="message__author">{{author}}</div>
      <div class="message__text">{{text}}</div>
  </div>
  <div class="user-item__info">
      <div class="info__time">{{time}}</div>
      <div class="info__count">{{count}}</div>
  </div>
`;

interface IUserItemProps extends IBaseProps {
  firstName: string;
  secondNane: string;
  message: string;
  time: string;
  count: number;
}

interface IUserItemInnerProps extends IBaseProps {
  author: string;
  text: string;
  time: string;
  count: number;
}

class UserItem extends Block<IUserItemInnerProps> {
  constructor(props: IUserItemProps) {
    const { firstName, secondNane, message, time, count } = props;

    super('div', {
      author: `${firstName} ${secondNane}`,
      text: message,
      time,
      count,
      attrs: { class: 'user-item' },
    });
  }

  render(): DocumentFragment {
    return this.compile(userItemTemplate, this.props);
  }
}

export { UserItem };
