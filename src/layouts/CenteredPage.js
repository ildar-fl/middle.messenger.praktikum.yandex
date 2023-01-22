import Handlebars from 'handlebars'
import './style.scss';

const CenteredPageTemplate = `
    <div class="centered-page-container {{classNames}}">
        {{{content}}}
    </div>
`;

function createCenteredPage({ classNames, content }) {
    const templateHome = Handlebars.compile(CenteredPageTemplate);

    return templateHome({ classNames, content });
}

export { createCenteredPage };
