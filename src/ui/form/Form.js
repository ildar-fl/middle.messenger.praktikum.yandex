import Handlebars from 'handlebars';
import './style.scss';

const FormTemplate = `
  <form class="form">
    <h1 class="form__title">{{title}}</h1>
    <div class="form__content">{{{content}}}</div>
    <div class="form__buttons">{{{buttons}}}</div>
  </form>
`;

function createForm({ title, content, buttons }) {
    const  template = Handlebars.compile(FormTemplate);

    return template({ title, content, buttons });
}

export { createForm };

