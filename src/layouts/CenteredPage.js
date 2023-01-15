import Handlebars from 'handlebars'
import './style.scss';

const CenteredPageTemplate = `
    <div class="centered-page-container">
        {{{content}}}
    </div>
`;

function createCenteredPage({ content }) {
    const templateHome = Handlebars.compile(CenteredPageTemplate);

    return templateHome({ content });
}

export { createCenteredPage };