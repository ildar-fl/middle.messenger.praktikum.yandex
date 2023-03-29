import { PlainObject } from './types';
import { merge } from './merge';

function set(object: PlainObject, path: string, value: unknown): PlainObject {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof object !== 'object') {
    return object;
  }

  const newObject = path
    .split('.')
    .reduceRight((acc, key) => ({ [key]: acc }), value);

  return merge(object, newObject as PlainObject);
}

export { set };
