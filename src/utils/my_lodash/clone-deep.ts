import { PlainObject } from './types';

function cloneDeep<T = any>(
  item: T,
): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
  // Handle:
  // * null
  // * undefined
  // * boolean
  // * number
  // * string
  // * symbol
  // * function
  if (item === null || typeof item !== 'object') {
    return item;
  }

  // Handle:
  // * Date
  if (item instanceof Date) {
    return new Date(item.valueOf());
  }

  // Handle:
  // * Array
  if (item instanceof Array) {
    return item.map(cloneDeep);
  }

  // Handle:
  // * Set
  if (item instanceof Set) {
    const copy = new Set();

    item.forEach(v => copy.add(cloneDeep(v)));

    return copy;
  }

  // Handle:
  // * Map
  if (item instanceof Map) {
    const copy = new Map();

    item.forEach((v, k) => copy.set(k, cloneDeep(v)));

    return copy;
  }

  // Handle:
  // * Object
  if (item instanceof Object) {
    const copy: PlainObject = {};

    // Handle:
    // * Object.symbol
    Object.getOwnPropertySymbols(item).forEach(s => {
      copy[s] = cloneDeep(item[s as keyof T]);
    });

    // Handle:
    // * Object.name (other)
    Object.keys(item).forEach(k => {
      copy[k] = cloneDeep(item[k as keyof T]);
    });

    return copy;
  }

  throw new Error(`Unable to copy object: ${item}`);
}

export { cloneDeep };
