function trim(value: string, chars = '') {
  if (chars) {
    const reg = new RegExp(`[${chars}]`, 'gi');
    return value.replace(reg, '');
  }

  return value.trim();
}

export { trim };
