"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_new_val_1 = require("./utils/get-new-val");
const get_field_1 = __importDefault(require("./utils/get-field"));
const get_dot_path_1 = __importDefault(require("./utils/get-dot-path"));
const get_old_val_1 = __importDefault(require("./utils/get-old-val"));
class DiffSentence {
    template;
    diff;
    'FIELD';
    'DOTPATH';
    'NEWVALUE';
    'OLDVALUE';
    'INDEX';
    'POSITION';
    constructor(diff, config, templates) {
        const context = { diff, config, templates };
        this.diff = diff;
        this.FIELD = (0, get_field_1.default)(context);
        this.OLDVALUE = (0, get_old_val_1.default)(context);
        this.NEWVALUE = (0, get_new_val_1.getNewValue)(context);
        this.DOTPATH = (0, get_dot_path_1.default)(context);
        if (typeof diff !== 'string') {
            this.INDEX = String(diff.index);
        }
        if (typeof diff !== 'string') {
            this.POSITION = String(diff.index && diff.index - 1);
        }
        this.template = this.getTemplate(context);
        this.format = this.format.bind(this);
    }
    format() {
        let sentence = this.template;
        const tokens = ['FIELD', 'DOTPATH', 'NEWVALUE', 'OLDVALUE', 'INDEX', 'POSITION'];
        for (const token of tokens) {
            sentence = sentence.replace(new RegExp(token, 'g'), this[token]);
        }
        return sentence;
    }
    getTemplate({ config, templates, diff }) {
        if (typeof diff === 'string') {
            return diff;
        }
        return templates[this.getTemplateKey(config, diff)];
    }
    getTemplateKey(config, diff) {
        if (config.sensitivePaths.includes(diff.dotPath)) {
            if (diff.kind === 'A') {
                throw new Error('Diff kind AS is not handled');
            }
            if (diff.kind === 'N' ||
                diff.kind === 'D' ||
                diff.kind === 'E' ||
                diff.kind === 'I' ||
                diff.kind === 'R' ||
                diff.kind === 'AE') {
                return `${diff.kind}S`;
            }
            throw new Error(`Diff kind ${diff.kind}S is not handled`);
        }
        if (diff.kind === 'A') {
            throw new Error('Diff kind A is not handled');
        }
        return diff.kind;
    }
}
exports.default = DiffSentence;
