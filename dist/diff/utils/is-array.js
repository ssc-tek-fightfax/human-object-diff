"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayDiff = void 0;
function isArrayDiff(diff) {
    const isArray = diff.kind === 'A' || diff.path?.map((p) => typeof p).includes('number');
    return Boolean(isArray);
}
exports.isArrayDiff = isArrayDiff;
