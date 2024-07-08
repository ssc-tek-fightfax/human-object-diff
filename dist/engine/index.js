"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanReadableDiffGenerator = void 0;
const deep_diff_1 = __importDefault(require("deep-diff"));
const index_1 = __importDefault(require("../sentence/index"));
const index_2 = __importDefault(require("../diff/index"));
const array_preprocessor_1 = require("./utils/array-preprocessor");
const get_prefilter_1 = __importDefault(require("./utils/get-prefilter"));
function humanReadableDiffGenerator(context) {
    return (lhs, rhs) => {
        const arrayDiffs = [];
        const sentences = [];
        const computedPreFilter = (0, get_prefilter_1.default)(context.config);
        const differences = (0, deep_diff_1.default)(lhs, rhs, computedPreFilter);
        if (!differences) {
            return [];
        }
        for (const singleDeepDiff of differences) {
            const diff = new index_2.default(singleDeepDiff);
            if (diff.isArray) {
                if (!context.config.ignoreArrays) {
                    arrayDiffs.push(diff);
                }
                continue;
            }
            const sentenceDiff = new index_1.default(diff, context.config, context.templates);
            context.sentenceDiffs.push(sentenceDiff);
            sentences.push(sentenceDiff.format());
        }
        if (!context.config.ignoreArrays) {
            for (const diff of (0, array_preprocessor_1.preProcessArrayDiffs)(arrayDiffs, lhs, rhs)) {
                const sentenceDiff = new index_1.default(diff, context.config, context.templates);
                context.sentenceDiffs.push(sentenceDiff);
                sentences.push(sentenceDiff.format());
            }
        }
        return sentences;
    };
}
exports.humanReadableDiffGenerator = humanReadableDiffGenerator;
