import { getLoginForm } from './pages/login';
import { getRegistrationForm } from './pages/registration';
import { createChatsPage } from './pages/chats';
import { routing } from './utils';
import { getInternalError, getNotFoundError } from './pages/error-code';
import { getEditProfile, getProfile } from './pages/profile';
import { ROUTS } from './constants';
import './index.css';
import { Block, render } from './core';

const rootNode = document.getElementById('root');

const MAIN_ROUTERS: Record<string, () => Block | string> = {
  [ROUTS.HOME]: getLoginForm,
  [ROUTS.LOGIN]: getLoginForm,
  [ROUTS.REGISTRATION]: getRegistrationForm,
  [ROUTS.CHATS]: createChatsPage,
  [ROUTS.PROFILE]: getProfile,
  [ROUTS.PROFILE_EDIT]: getEditProfile,
  [ROUTS.NOT_FOUND]: getNotFoundError,
  [ROUTS.INTERNAL_ERROR]: getInternalError,
};

const changeUrl = (template: any) => {
  const result = template();

  if (result instanceof Block) {
    render('#root', result);
  } else if (rootNode) {
    rootNode.innerHTML = result;
  }
};

routing(MAIN_ROUTERS, changeUrl);
