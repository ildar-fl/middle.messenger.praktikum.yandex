import Handlebars from 'handlebars'
import './style.scss';

const userItemTemplate = `
    <div class="user-item">
        <div class="user-item__avatar">
        
        </div>
        <div class="user-item__message">
        
        </div>
        <div class="user-item__info">
        
        </div>
    </div>
`;

function createUserItem() {
    const template = Handlebars.compile(userItemTemplate);

    return template();
}

export { createUserItem };