export type PlainObject<T = any> = {
  [k in string | symbol]: T;
};
