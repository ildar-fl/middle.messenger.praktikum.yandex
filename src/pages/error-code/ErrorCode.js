import Handlebars from 'handlebars';
import './style.scss';

const ErrorCodeTemplate = `
    <div class="error-code-container">
        <h1>{{code}}</h1>
        <h2>{{description}}</h2>
        {{{button}}}
    </div>
`

function createErrorCode({ code, description, button }) {
    const  template = Handlebars.compile(ErrorCodeTemplate);

    return template({ code, description, button });
}

export { createErrorCode };