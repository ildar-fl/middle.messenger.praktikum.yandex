import Handlebars from 'handlebars';
import './button.css';

const ButtonTemplate = `
    <div class="button-text-container">
        <button id="{{id}}" class="button-text">
            {{title}}
        </button>
    </div>
`

function createButtonText({ id, title }) {
    const  template = Handlebars.compile(ButtonTemplate);

    return template({ id, title });
}

export { createButtonText };