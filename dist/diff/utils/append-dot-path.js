"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotPathReducer = exports.appendDotPath = void 0;
const is_array_1 = require("./is-array");
function appendDotPath(diff) {
    if (!diff.path) {
        return '';
    }
    if (!(0, is_array_1.isArrayDiff)(diff)) {
        return diff.path.reduce(dotPathReducer({ path: diff.path }), '');
    }
    let propertyIndex = diff.path.length - 1;
    while (typeof diff.path[propertyIndex] !== 'string') {
        propertyIndex -= 1;
    }
    return diff.path.slice(0, propertyIndex + 1).reduce(dotPathReducer({ path: diff.path }), '');
}
exports.appendDotPath = appendDotPath;
function dotPathReducer(diff) {
    return function (acc, value, i) {
        return typeof value === 'string'
            ? diff.path && typeof diff.path[i + 1] === 'string'
                ? acc.concat(`${String(value)}.`)
                : acc.concat(String(value))
            : diff.path && typeof diff.path[i + 1] === 'string'
                ? acc.concat(`[${String(value)}].`)
                : acc.concat(`[${String(value)}]`);
    };
}
exports.dotPathReducer = dotPathReducer;
