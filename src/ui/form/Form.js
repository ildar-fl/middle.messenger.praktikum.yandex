import Handlebars from 'handlebars';
import './form.scss';

const FormTemplate = `
  <form class="form">
    <div class="form__title">{{title}}</div>
    <div class="form__content">{{{content}}}</div>
    <div class="form__buttons">{{{buttons}}}</div>
  </form>
`;

function createForm({ title, content, buttons }) {
    const  template = Handlebars.compile(FormTemplate);

    return template({ title, content, buttons });
}

export { createForm };

