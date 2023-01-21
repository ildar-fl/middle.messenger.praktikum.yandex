import Handlebars from 'handlebars';
import './style.scss';
import { parseStyle } from '../../utils';

const ButtonTemplate = `
    <button id="{{id}}" class="button" style="{{style}}" type="{{type}}">
        {{title}}
    </button>
`

function createButton({ id, title, style, type='button' }) {
   const  template = Handlebars.compile(ButtonTemplate);

   return template({ id, title, style: parseStyle(style), type });
}

export { createButton };