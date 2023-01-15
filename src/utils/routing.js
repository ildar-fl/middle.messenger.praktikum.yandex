function resolveRoute(routes, route) {
    const template = routes[route];

    if (template) {
        return template;
    }

    window.location.href = '/404';
}

function routing(routes, callback) {
    function router() {
        let url = window.location.pathname || '/';

        let template = resolveRoute(routes, url);

        if (template) {
            callback(template);
        }
    }

    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
}

export { routing };