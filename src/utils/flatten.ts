type NestedArray<T = unknown> = T | NestedArray<T>[];

/*
 * Рекурсиный подход перебора массива
 * */
function flatten<T>(array: NestedArray<T>[]): T[] {
  return array.reduce(
    (acc: T[], value) =>
      acc.concat(Array.isArray(value) ? flatten(value) : value),
    [],
  );
}

/*
 * Используя стек
 * */
function flattenStack<T>(array: NestedArray<T>[]): T[] {
  const result: T[] = [];
  const stack = [...array];

  while (stack.length > 0) {
    const value = stack.pop();

    if (Array.isArray(value)) {
      stack.push(...value);
    } else {
      result.push(value as T);
    }
  }
  return result.reverse();
}
