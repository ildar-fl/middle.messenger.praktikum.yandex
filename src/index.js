import './index.scss';
import { createLoginForm } from './pages/login';
import { createRegistrationForm } from './pages/registration';
import { createChatsPage } from './pages/chats';
import { routing } from './utils';
import { createInternalError, createNotFound } from './pages/error-code';

const rootNode = document.getElementById('root');

const MAIN_ROUTERS = {
    '/': createLoginForm,
    '/login': createLoginForm,
    '/registration': createRegistrationForm,
    '/chats': createChatsPage,
    '/404': createNotFound,
    '/500': createInternalError,
}

const changeUrl = (template) => {
    rootNode.innerHTML = template();
}

routing(MAIN_ROUTERS, changeUrl);

