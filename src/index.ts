import { routing } from './utils';
import {
  Chats,
  getInternalErrorPage,
  getNotFoundPage,
  Login,
  getProfilePage,
  getEditProfilePage,
  Registration,
} from './pages';
import { ROUTS } from './constants';
import './index.css';
import { Block, render } from './core';

const MAIN_ROUTERS = {
  [ROUTS.HOME]: new Login(),
  [ROUTS.LOGIN]: new Login(),
  [ROUTS.REGISTRATION]: new Registration(),
  [ROUTS.CHATS]: new Chats(),
  [ROUTS.PROFILE]: getProfilePage,
  [ROUTS.PROFILE_EDIT]: getEditProfilePage,
  [ROUTS.NOT_FOUND]: getNotFoundPage,
  [ROUTS.INTERNAL_ERROR]: getInternalErrorPage,
};

const changeUrl = (template: Block) => {
  render('#root', template);
};

routing(MAIN_ROUTERS, changeUrl);
