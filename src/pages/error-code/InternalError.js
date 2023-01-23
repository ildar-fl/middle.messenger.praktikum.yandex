import { createCenteredPage } from '../../layouts';
import { createErrorCode } from './ErrorCode';
import { createButtonText } from "../../ui";

function createInternalError() {
    return createCenteredPage({
        content: createErrorCode({
            code: '500',
            description: 'Мы уже фиксим',
            button: createButtonText({
                title: 'Назад к чатам',
                as: 'a',
                href: '/chats',
            }),
        }),
    });
}

export { createInternalError };
