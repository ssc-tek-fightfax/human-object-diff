"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const defaults_1 = require("./engine/utils/defaults");
class DiffEngine {
    diff;
    sentenceDiffs;
    sentences;
    config;
    templates;
    constructor(config = {}) {
        const cfg = {
            ...(0, defaults_1.defaultConfig)(),
            ...config,
            templates: {
                ...(0, defaults_1.defaultConfig)().templates,
                ...config.templates,
            },
        };
        const { templates, ...conf } = cfg;
        this.config = conf;
        this.templates = { ...(0, defaults_1.defaultConfig)().templates, ...templates };
        this.sentenceDiffs = [];
        this.sentences = [];
        this.diff = (0, engine_1.humanReadableDiffGenerator)({
            config: this.config,
            sentenceDiffs: this.sentenceDiffs,
            templates: this.templates,
            sentences: this.sentences,
        });
    }
}
// ES module export
exports.default = DiffEngine;
