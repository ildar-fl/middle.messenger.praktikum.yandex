import Handlebars from 'handlebars';
import './style.css';

const ButtonTemplate = `
    <div class="{{classNames}} flex-container">
        {{{content}}}
    </div>
`

function flexContainer({
    content
}: any) {
  return Handlebars.compile(ButtonTemplate)({content});
}

export { flexContainer };
