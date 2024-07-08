"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_property_value_1 = __importDefault(require("./format-property-value"));
function getOldValue(context) {
    if (typeof context.diff === 'string') {
        return '';
    }
    let formatted = '';
    if ('lhs' in context.diff && context.diff.lhs) {
        formatted = (0, format_property_value_1.default)(context.diff.lhs, context.config);
    }
    else if (context.diff.val) {
        formatted = (0, format_property_value_1.default)(context.diff.val, context.config);
    }
    return formatted.replace(/"/g, '');
}
exports.default = getOldValue;
