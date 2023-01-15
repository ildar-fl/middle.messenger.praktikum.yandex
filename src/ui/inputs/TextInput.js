import Handlebars from 'handlebars';
import './style.scss';

const TextInputTemplate = `
  <div class="input-container">
    {{#if label}}
    <label id={{labelId}}>{{label}}</label>
    {{/if}}
    <input id={{id}} for={{labelId}} type={{type}} name={{name}} placeholder={{placeholder}}>
  </div>  
`;

function createInput({ id, labelId = 'forInput', label, placeholder, type='text', name }) {
    const template = Handlebars.compile(TextInputTemplate);

    return template({ id, labelId, label, placeholder, type, name });
}

export { createInput }