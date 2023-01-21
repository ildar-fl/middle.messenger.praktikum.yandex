
function parseStyle(style) {
  return Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';');
}

export { parseStyle }