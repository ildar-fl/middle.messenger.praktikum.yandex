import Handlebars from 'handlebars';
import './button.scss';

const ButtonTemplate = `
    <button id="{{id}}" class="button" type="{{type}}">
        {{title}}
    </button>
`

function createButton({ id, title, type='button' }) {
   const  template = Handlebars.compile(ButtonTemplate);

   return template({ id, title, type });
}

export { createButton };