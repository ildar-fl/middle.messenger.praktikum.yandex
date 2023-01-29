import { createLoginForm } from './pages/login';
import { createRegistrationForm } from './pages/registration';
import { createChatsPage } from './pages/chats';
import { routing } from './utils';
import { createInternalError, createNotFound } from './pages/error-code';
import { createProfile, createEditProfile } from './pages/profile';
import { ROUTS } from './constants';
import './index.css';

const rootNode = document.getElementById('root');

const MAIN_ROUTERS: Record<string, () => string> = {
  [ROUTS.HOME]: createLoginForm,
  [ROUTS.LOGIN]: createLoginForm,
  [ROUTS.REGISTRATION]: createRegistrationForm,
  [ROUTS.CHATS]: createChatsPage,
  [ROUTS.PROFILE]: createProfile,
  [ROUTS.PROFILE_EDIT]: createEditProfile,
  [ROUTS.NOT_FOUND]: createNotFound,
  [ROUTS.INTERNAL_ERROR]: createInternalError,
};

const changeUrl = (template: any) => {
  if (rootNode) {
    rootNode.innerHTML = template();
  }
};

routing(MAIN_ROUTERS, changeUrl);
