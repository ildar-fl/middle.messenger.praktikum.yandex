import { render } from '../render-dom';
import { isEqual } from '../../utils/my_lodash';
import { Block } from '../Block';

type Nullable<T> = T | null;

class Route {
  _pathname: string;
  _blockClass: typeof Block;
  _block: Nullable<Block>;
  _props;

  constructor(pathname: string, view: typeof Block, props: any) {
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
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export { Route };
