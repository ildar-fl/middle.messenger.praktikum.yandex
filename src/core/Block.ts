import { v4 as uuid } from 'uuid';
import { EventBus } from './EventBus';
import { compile } from '../utils';

type Nullable<T> = T | null;
type ChildrenType = Record<string, Block | Block[]>;

type ComponentsProps = Record<string | symbol, any>;

interface IBaseProps {
  attrs?: Record<string, any>;
  events?: {
    [K in keyof GlobalEventHandlersEventMap]?: (
      event: GlobalEventHandlersEventMap[K],
    ) => void;
  };
}

type MetaType<PropsType> = {
  tagName: keyof HTMLElementTagNameMap;
  props: PropsType;
};

abstract class Block<
  PropsType extends IBaseProps & ComponentsProps = ComponentsProps,
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_RENDER: 'flow:render',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
  } as const;

  _element: Nullable<HTMLElement> = null;
  _meta: Nullable<MetaType<PropsType>> = null;
  _id: Nullable<string> = null;
  _children: ChildrenType;

  props: PropsType;
  eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsAndChildren
   *
   * @returns {void}
   */
  protected constructor(
    tagName: keyof HTMLElementTagNameMap = 'div',
    propsAndChildren = {} as PropsType,
  ) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren);

    this._children = children;

    this._meta = {
      tagName,
      props,
    };

    this._id = uuid();

    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: PropsType): {
    props: PropsType;
    children: ChildrenType;
  } {
    const children: ChildrenType = {};
    const props: PropsType = {} as PropsType;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.length > 0 && value[0] instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key as keyof PropsType] = value;
      }
    });

    return { props, children };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _init() {
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

    Object.values(this._children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(subChild => subChild.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    const isNeedRender = this.componentDidUpdate(oldProps, newProps);

    if (isNeedRender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: PropsType, newProps: PropsType): boolean;
  componentDidUpdate(oldProps: PropsType): boolean;
  componentDidUpdate(): boolean {
    return true;
  }

  setProps(nextProps: Partial<PropsType>) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get id(): Nullable<string> {
    return this._id;
  }

  private _addAttrs() {
    const { attrs } = this.props;

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (this._element && typeof value !== 'undefined') {
          this._element.setAttribute(key, value);
        }
      });
    }
  }

  private _addEvents() {
    const { events = {} } = this.props;

    (Object.keys(events) as (keyof GlobalEventHandlersEventMap)[]).forEach(
      eventName => {
        const listener = events[eventName];
        if (listener && this._element) {
          this._element.addEventListener(eventName, listener as EventListener);
        }
      },
    );
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    (Object.keys(events) as (keyof GlobalEventHandlersEventMap)[]).forEach(
      eventName => {
        const listener = events[eventName];
        if (listener && this._element) {
          this._element.removeEventListener(
            eventName,
            listener as EventListener,
          );
        }
      },
    );
  }

  _render(): void {
    const block = this.render();

    if (this._element) {
      this._removeEvents();

      if (block) {
        this._element.innerHTML = '';
        this._element.appendChild(block);
      }

      this._addAttrs();

      this._addEvents();
    }
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): null | DocumentFragment {
    return null;
  }

  getContent(): Nullable<HTMLElement> {
    return this._element;
  }

  _makePropsProxy(props: PropsType): PropsType {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      set(target: any, prop: string, val: any) {
        if (target[prop] !== val) {
          target[prop] = val;

          self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, {
            ...self.props,
            [prop]: val,
          });
        }

        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _createDocumentElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  compile(
    template: string,
    props: Omit<PropsType, keyof IBaseProps>,
  ): DocumentFragment {
    const propsAndStubs: ComponentsProps = {
      ...props,
    };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          subChild => `<div data-id="${subChild.id}"></div>`,
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = compile(
      template,
      propsAndStubs as Record<string, string | number | boolean>,
    );

    const replaceChild = (child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent()!);
      } else {
        throw new Error(`query selector data-id="${child.id}" not found.`);
      }
    };

    Object.values(this._children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(subChild => replaceChild(subChild));
      } else {
        replaceChild(child);
      }
    });

    return fragment.content;
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

export { Block, IBaseProps };
