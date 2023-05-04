type CallbackType<C extends unknown[]> = (...args: C) => void;

class EventBus<E extends Record<string, unknown[]> = any> {
  private readonly listeners: {
    [K in keyof E]?: Array<CallbackType<E[K]>>;
  };

  constructor() {
    this.listeners = {};
  }

  on<K extends keyof E>(event: K, callback: CallbackType<E[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off<K extends keyof E>(event: K, callback: CallbackType<E[K]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event as string}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback,
    );
  }

  emit<K extends keyof E>(event: K, ...args: E[K]) {
    this.listeners[event]?.forEach(listener => {
      listener(...args);
    });
  }
}

export { EventBus };
