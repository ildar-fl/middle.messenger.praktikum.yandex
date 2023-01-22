function range(start = 0, end, step, isRight) {
    const firstEl = (typeof end === 'number') ? start : 0;
    const lastEl = (typeof end === 'number') ? end : start;
    const stepEl = (typeof step === 'number') ? step : (lastEl >= firstEl ? 1 : -1);
    const count = stepEl === 0 ? Math.abs(lastEl - firstEl) : Math.floor(Math.abs((lastEl - firstEl) / stepEl));
    const result = new Array(count).fill(firstEl).map((_, index) => firstEl + index * stepEl);

    if (isRight) {
        return result.reverse();
    }

    return result
}

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

function isEmpty(value) {
    if ((typeof value !== 'object' && typeof value !== 'string') || !value) {
        return true;
    }

    if (Array.isArray(value) || typeof value === 'string') {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    return Object.keys(value).length === 0;
}

export { range, isEmpty, rangeRight };
