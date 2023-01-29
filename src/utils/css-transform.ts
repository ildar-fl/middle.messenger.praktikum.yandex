function parseStyle(style?: Record<string, string>): string {
  if (!style) {
    return '';
  }

  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
}

export { parseStyle };
