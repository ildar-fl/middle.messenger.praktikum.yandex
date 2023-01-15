import Handlebars from 'handlebars';
import './style.css';

const ButtonTemplate = `
    <div class="button-text-container">
        <{{as}} id="{{id}}" as="{{as}}" href="{{href}}" class="button-text">
            {{title}}
        </{{as}}>
    </div>
`

function createButtonText({ id, title, as='button', href }) {
    const  template = Handlebars.compile(ButtonTemplate);

    return template({ id, as, href, title, });
}

export { createButtonText };