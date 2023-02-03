import { EventBus } from './EventBus';

type Nullable<T> = T | null;

type PropsType = Record<string, any>;

type MetaType = {
  tagName: string;
  props: PropsType;
};

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  _element: Nullable<HTMLElement> = null;
  _meta: Nullable<MetaType> = null;

  props: PropsType;
  eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: PropsType) {
    console.log(oldProps);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // _componentDidUpdate(oldProps, newProps) {}

  componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): Nullable<HTMLElement> {
    return this._element;
  }

  _render(): void {
    const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду

    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): string {
    return '';
  }

  getContent(): Nullable<HTMLElement> {
    return this.element;
  }

  _makePropsProxy(props: PropsType): PropsType {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // const self = this;

    // Здесь вам предстоит реализовать метод
    return props;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    const el = this.getContent();

    if (el) {
      el.style.display = 'block';
    }
  }

  hide() {
    const el = this.getContent();
    if (el) {
      el.style.display = 'none';
    }
  }
}

export { Block };
