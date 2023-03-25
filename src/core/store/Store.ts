import { set } from 'utils/my_lodash';
import { EventBus } from '../event-bus';

enum StoreEvents {
  Updated = 'updated',
}

type Indexed = any;

/**
 * Мутабельное состояние с однонаправленным потоком данных
 */
class Store extends EventBus {
  private state: Indexed = {};

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
export { StoreEvents, Indexed };
