import Handlebars from 'handlebars';
import './style.css';

const ButtonTemplate = `
    <{{as}} id="{{id}}" as="{{as}}" href="{{href}}" disabled="{{disabled}}" class="{{classNames}} button-text">
        {{title}}
    </{{as}}>
`;

function createButtonText({
  id,
  title,
  classNames,
  disabled,
  as = 'button',
  href,
}: any) {
  const template = Handlebars.compile(ButtonTemplate);

  const classNamesStr = Array.isArray(classNames)
    ? classNames.join(' ')
    : classNames ?? '';

  return template({
    id,
    as,
    disabled,
    classNames: classNamesStr,
    href,
    title,
  });
}

export { createButtonText };
