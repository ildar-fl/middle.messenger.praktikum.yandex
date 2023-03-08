import { routing } from './utils';
import {
  Chats,
  getInternalErrorPage,
  getNotFoundPage,
  Login,
  Profile,
  EditProfile,
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
  [ROUTS.PROFILE]: new Profile(),
  [ROUTS.PROFILE_EDIT]: new EditProfile(),
  [ROUTS.NOT_FOUND]: getNotFoundPage,
  [ROUTS.INTERNAL_ERROR]: getInternalErrorPage,
};

const changeUrl = (template: Block) => {
  render('#root', template);
};

routing(MAIN_ROUTERS, changeUrl);
