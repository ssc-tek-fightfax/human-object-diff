"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const append_dot_path_1 = require("../../diff/utils/append-dot-path");
function getDotPath(context) {
    if (typeof context.diff === 'string') {
        return `${context.config.objectName}`;
    }
    if (context.diff.dotPath) {
        return `${context.config.objectName}.${context.diff.dotPath}`;
    }
    const { diff } = context;
    const path = Array.isArray(diff.path) ? [...diff.path].reduce((0, append_dot_path_1.dotPathReducer)({ path: diff.path }), '') : '';
    // eslint-disable-next-line unicorn/consistent-destructuring
    return `${context.config.objectName}.${path}`;
}
exports.default = getDotPath;
