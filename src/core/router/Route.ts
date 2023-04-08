import { render } from '../render-dom';
import { Block } from '../Block';

type Nullable<T> = T | null;

interface IRouteProps {
  rootQuery: string;
  root: Element;
}

class Route {
  _pathname: string;
  _blockClass: typeof Block;
  _block: Nullable<Block>;
  _props: IRouteProps;

  constructor(pathname: string, view: typeof Block, props: IRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      const component = this._block.getContent();
      if (component) {
        this._props.root.removeChild(component);
      }
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}

export { Route };
