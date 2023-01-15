import './index.scss';
import { createLoginForm } from './pages/login';
import { createRegistrationForm } from './pages/registration';
import {routing} from "./utils";

const rootNode = document.getElementById('root');

const MAIN_ROUTERS = {
    '/': createLoginForm,
    '/login': createLoginForm,
    '/registration': createRegistrationForm,
    '/404': () => '404',
}

const changeUrl = (template) => {
    rootNode.innerHTML = template();
}

routing(MAIN_ROUTERS, changeUrl);

