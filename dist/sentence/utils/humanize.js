"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const humanize_string_1 = __importDefault(require("humanize-string"));
const titleize_1 = __importDefault(require("titleize"));
function humanize(prop, config) {
    return config.dontHumanizePropertyNames ? prop : (0, titleize_1.default)((0, humanize_string_1.default)(prop));
}
exports.default = humanize;
