import { set } from '../../utils/my_lodash';
import { EventBus } from '../event-bus';
import { UserType } from '../../common/types';

enum StoreEvents {
  Updated = 'updated',
}

type StoreType = {
  user?: UserType;
};

/**
 * Мутабельное состояние с однонаправленным потоком данных
 */
class Store extends EventBus {
  private state: StoreType = {};

  public getState(): StoreType {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
export { StoreEvents, StoreType };
