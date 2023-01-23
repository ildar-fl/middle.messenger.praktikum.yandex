import Handlebars from 'handlebars'
import './style.scss';

const userItemTemplate = `
    <div class="user-item">
        <div class="user-item__avatar user-avatar"></div>
        <div class="user-item__message">
            <div class="message__author">{{author}}</div>
            <div class="message__text">{{text}}</div>
        </div>
        <div class="user-item__info">
            <div class="info__time">{{time}}</div>
            <div class="info__count">{{count}}</div>
        </div>
    </div>
`;

function createUserItem({ firstName, secondNane, message, time, count }) {
    const template = Handlebars.compile(userItemTemplate);

    return template({ author: `${firstName} ${secondNane}`, text: message, time, count });
}

export { createUserItem };
