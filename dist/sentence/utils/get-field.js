"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const humanize_1 = __importDefault(require("./humanize"));
function getField(context) {
    if (typeof context.diff === 'string') {
        return '';
    }
    if (context.diff.path) {
        let propertyIndex = context.diff.path.length - 1;
        while (typeof context.diff.path[propertyIndex] !== 'string') {
            propertyIndex -= 1;
        }
        const property = context.diff.path[propertyIndex];
        return (0, humanize_1.default)(String(property), context.config);
    }
    return '';
}
exports.default = getField;
