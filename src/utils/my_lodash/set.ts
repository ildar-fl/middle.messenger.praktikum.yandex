function set<T>(obj: T, path: string, value: string | number | unknown): T {
  return { ...obj, [path]: value };
}

export { set };
