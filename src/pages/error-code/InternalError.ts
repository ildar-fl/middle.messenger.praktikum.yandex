import { CenteredPage } from '../../layouts';
import { ErrorCode } from './ErrorCode';
import { ButtonText } from '../../ui';

function getInternalError() {
  const errorCodeBlock = new ErrorCode({
    code: '500',
    description: 'Мы уже фиксим',
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

export { getInternalError };
