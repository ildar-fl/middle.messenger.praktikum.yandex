import { createCenteredPage } from '../../layouts';
import { createErrorCode } from './ErrorCode';
import { createButtonText } from "../../ui";

function createNotFound() {
    return createCenteredPage({
        content: createErrorCode({
            code: '404',
            description: 'Не туда попали',
            button: createButtonText({
                title: 'Назад к чатам',
                as: 'a',
                href: '/chats',
            }),
        }),
    });
}

export { createNotFound };
