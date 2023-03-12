import { CenteredPage } from '../../layouts';
import { ErrorCode } from './ErrorCode';
import { ButtonText } from '../../ui';

class NotFoundPage extends CenteredPage {
  constructor() {
    const errorCodeBlock = new ErrorCode({
      code: '404',
      description: 'Не туда попали',
      button: new ButtonText({
        text: 'Назад к чатам',
        attrs: {
          as: 'a',
          href: '/chats',
          class: ['m__l-auto', 'm__r-auto'],
        },
      }),
    });

    super({ content: errorCodeBlock });
  }
}

export { NotFoundPage };
