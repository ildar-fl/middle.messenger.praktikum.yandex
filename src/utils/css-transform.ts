function parseStyle(style?: Record<string, string>): string {
  if (!style) {
    return '';
  }

  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
}

class ClassNames {
  _classNames: string[];

  constructor(classNames?: string | string[]) {
    if (!classNames) {
      this._classNames = [];
    } else {
      this._classNames = Array.isArray(classNames) ? classNames : [classNames];
    }
  }

  addClassName(className: string): void {
    this._classNames.push(className);
  }

  getClass(): string {
    return this._classNames.join(' ');
  }
}

export { parseStyle, ClassNames };
