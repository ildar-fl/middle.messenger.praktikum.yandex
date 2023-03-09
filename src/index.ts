import { routing } from './utils';
import {
  Chats,
  InternalErrorPage,
  NotFoundPage,
  Login,
  Profile,
  EditProfile,
  Registration,
} from './pages';
import { Navigation } from './components';
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
  [ROUTS.NOT_FOUND]: new NotFoundPage(),
  [ROUTS.INTERNAL_ERROR]: new InternalErrorPage(),
};

const changeUrl = (template: Block) => {
  render('#root', template);
  render('body', new Navigation());
};

routing(MAIN_ROUTERS, changeUrl);
