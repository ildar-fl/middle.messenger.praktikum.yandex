import Handlebars from 'handlebars';

function compile(
  template: string,
  props: Record<string, string | number | boolean>,
): string {
  return Handlebars.compile(template)(props);
}

export { compile };
