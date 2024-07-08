"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewValue = exports.isDisplayable = void 0;
const format_property_value_1 = __importDefault(require("./format-property-value"));
function isDisplayable(value) {
    return Boolean(value) || Number.isFinite(value) || ['boolean', 'bigint'].includes(typeof value);
}
exports.isDisplayable = isDisplayable;
function getNewValue(context) {
    let formatted;
    if (typeof context.diff === 'string') {
        return '';
    }
    if ('val' in context.diff && isDisplayable(context.diff.val)) {
        formatted = (0, format_property_value_1.default)(context.diff.val, context.config);
    }
    else if ('rhs' in context.diff && context.diff.rhs) {
        formatted = (0, format_property_value_1.default)(context.diff.rhs, context.config);
    }
    else {
        formatted = '';
    }
    return formatted.replace(/"/g, '');
}
exports.getNewValue = getNewValue;
