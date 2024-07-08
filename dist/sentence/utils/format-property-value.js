"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = __importDefault(require("date-fns/format"));
function formatPropertyValue(value, config) {
    if (typeof value === 'string') {
        return `"${value}"`;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    if (typeof value === 'bigint') {
        return `${String(value)}n`;
    }
    if (value instanceof Date && config.dateFormat) {
        return `${(0, format_1.default)(value, config.dateFormat)}`;
    }
    return JSON.stringify(value);
}
exports.default = formatPropertyValue;
