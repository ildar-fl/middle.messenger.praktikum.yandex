import { PlainObject } from './types';

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  if (typeof rhs === 'object') {
    Object.keys(rhs).forEach(key => {
      if (key in lhs) {
        lhs[key] = merge(lhs[key] as PlainObject, rhs[key] as PlainObject);
      } else {
        lhs[key] = rhs[key];
      }
    });
  }

  return lhs;
}

export { merge };
