
function parseStyle(style) {
  if (!style) {
    return '';
  }

  return Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';');
}

export { parseStyle }