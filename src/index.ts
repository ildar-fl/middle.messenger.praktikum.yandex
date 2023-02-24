import { getLoginForm } from './pages/login';
import { getRegistrationForm } from './pages/registration';
import { createChatsPage } from './pages/chats';
import { routing } from './utils';
import { createInternalError, createNotFound } from './pages/error-code';
import { createProfile, createEditProfile } from './pages/profile';
import { ROUTS } from './constants';
import './index.css';
import { Block, render } from './core';

const rootNode = document.getElementById('root');

const MAIN_ROUTERS: Record<string, () => Block | string> = {
  [ROUTS.HOME]: getLoginForm,
  [ROUTS.LOGIN]: getLoginForm,
  [ROUTS.REGISTRATION]: getRegistrationForm,
  [ROUTS.CHATS]: createChatsPage,
  [ROUTS.PROFILE]: createProfile,
  [ROUTS.PROFILE_EDIT]: createEditProfile,
  [ROUTS.NOT_FOUND]: createNotFound,
  [ROUTS.INTERNAL_ERROR]: createInternalError,
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
