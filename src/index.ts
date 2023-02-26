import { routing } from './utils';
import {
  getChatPage,
  getInternalErrorPage,
  getNotFoundPage,
  getLoginPage,
  getProfilePage,
  getEditProfilePage,
  getRegistrationPage,
} from './pages';
import { ROUTS } from './constants';
import './index.css';
import { Block, render } from './core';

const MAIN_ROUTERS = {
  [ROUTS.HOME]: getLoginPage,
  [ROUTS.LOGIN]: getLoginPage,
  [ROUTS.REGISTRATION]: getRegistrationPage,
  [ROUTS.CHATS]: getChatPage,
  [ROUTS.PROFILE]: getProfilePage,
  [ROUTS.PROFILE_EDIT]: getEditProfilePage,
  [ROUTS.NOT_FOUND]: getNotFoundPage,
  [ROUTS.INTERNAL_ERROR]: getInternalErrorPage,
};

const changeUrl = (template: () => Block) => {
  const result = template();

  render('#root', result);
};

routing(MAIN_ROUTERS, changeUrl);
