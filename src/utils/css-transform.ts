function parseStyle(style: any) {
  if (!style) {
    return '';
  }

  // @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
}

export { parseStyle };
