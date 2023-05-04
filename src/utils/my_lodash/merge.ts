import { PlainObject } from './types';

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  if (
    typeof rhs === 'object' &&
    rhs !== null &&
    typeof lhs === 'object' &&
    lhs !== null
  ) {
    Object.keys(rhs).forEach(key => {
      if (key in lhs) {
        lhs[key] = merge(lhs[key] as PlainObject, rhs[key] as PlainObject);
      } else {
        lhs[key] = rhs[key];
      }
    });
  }

  return rhs;
}

export { merge };
