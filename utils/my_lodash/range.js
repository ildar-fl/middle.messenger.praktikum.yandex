/*
	* range(4); // => [0, 1, 2, 3]
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

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

// console.log(rangeRight(4));
// console.log(rangeRight(-4));
// console.log(rangeRight(1, 5));
// console.log(rangeRight(0, 20, 5));
// console.log(rangeRight(0, -4, -1));
// console.log(rangeRight(1, 4, 0));
// console.log(rangeRight(0));
// console.log(rangeRight());
// console.log(rangeRight(0, 0, 0));
// console.log(rangeRight(0, -10));
// console.log(rangeRight(-1, -1, -1));
// console.log(rangeRight(-4, 0, 2));

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

console.log(isEmpty(null)); // => true
console.log(isEmpty(true)); // => true
console.log(isEmpty(1)); // => true
console.log(isEmpty([1, 2, 3])); // => false
console.log(isEmpty({'a': 1})); // => false
console.log(isEmpty('123')); // => false
console.log(isEmpty(123)); // => true
console.log(isEmpty('')); // => true
console.log(isEmpty(0)); // => true
console.log(isEmpty(undefined)); // => true
console.log(isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']]))); // => false
console.log(isEmpty(new Set(['value1', 'value2', 'value3']))); // => false