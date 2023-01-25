import Handlebars from 'handlebars'
import './style.scss';

const CenteredPageTemplate = `
    <main class="centered-page-container {{classNames}}">
        {{{content}}}
    </main>
`;

function createCenteredPage({
    classNames,
    content
}: any) {
    const templateHome = Handlebars.compile(CenteredPageTemplate);

    return templateHome({ classNames, content });
}

export { createCenteredPage };
