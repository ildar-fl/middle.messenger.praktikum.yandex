import Handlebars from 'handlebars'
import './home.scss';
import {createLoginForm} from './modules/login';

const HomeTemplate = `
    <div class="home-container">
        {{{form}}}
    </div>
`

function createHome() {
  const templateHome = Handlebars.compile(HomeTemplate);

  return templateHome({ form: createLoginForm() });
}

export { createHome }