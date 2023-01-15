import Handlebars from 'handlebars';
import './button.scss';

const ButtonTemplate = `
    <button id="{{id}}" class="button">
        {{title}}
    </button>
`

function createButton({ id, title }) {
   const  template = Handlebars.compile(ButtonTemplate);

   return template({ id, title });
}

export { createButton };