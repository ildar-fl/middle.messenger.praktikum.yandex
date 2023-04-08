import { Route } from './Route';
import { Block } from '../Block';
import { getRoot } from '../render-dom';

class Router {
  static __instance: Router;
  routes: Route[] = [];
  history: typeof window.history = window.history;
  _rootQuery = '';
  _root!: Element;
  _currentRoute: Route | null = null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._root = getRoot(rootQuery);

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block<any>) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      root: this._root,
    });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const { currentTarget } = event;

      if (currentTarget) {
        this._onRoute((currentTarget as Window).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute !== route) {
      if (this._currentRoute) {
        this._currentRoute.leave();
      }
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    if (this._currentRoute?._pathname !== pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export { Router };
