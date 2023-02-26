import { CenteredPage } from '../../layouts';
import { ErrorCode } from './ErrorCode';
import { ButtonText } from '../../ui';

function getNotFoundPage() {
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

  return new CenteredPage({ content: errorCodeBlock });
}

export { getNotFoundPage };
