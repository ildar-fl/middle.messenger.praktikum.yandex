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
import { ROUTS } from './common/constants';
import './index.css';
import { render, Router } from './core';

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#root');
  router.use(ROUTS.HOME, Login);
  router.use(ROUTS.LOGIN, Login);
  router.use(ROUTS.REGISTRATION, Registration);
  router.use(ROUTS.CHATS, Chats);
  router.use(ROUTS.PROFILE, Profile);
  router.use(ROUTS.PROFILE_EDIT, EditProfile);
  router.use(ROUTS.NOT_FOUND, NotFoundPage);
  router.use(ROUTS.INTERNAL_ERROR, InternalErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTS.HOME:
    case ROUTS.LOGIN:
    case ROUTS.REGISTRATION:
      isProtectedRoute = false;
      break;
  }

  if (isProtectedRoute) {
    router.go(ROUTS.LOGIN);
  } else {
    router.start();
  }
});

render('body', new Navigation());
