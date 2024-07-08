"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const append_dot_path_1 = require("./utils/append-dot-path");
const is_object_1 = __importDefault(require("./utils/is-object"));
const is_array_1 = require("./utils/is-array");
class Diff {
    isArray;
    lhs;
    rhs;
    index;
    path;
    val; // Seems to be invalid // TODO this is probably bug
    dotPath;
    kind;
    item;
    hasNestedChanges;
    constructor(diff) {
        this.kind = diff.kind;
        if (diff.kind !== 'E' && diff.kind !== 'D' && diff.kind !== 'N') {
            this.index = diff.index;
        }
        if (diff.kind !== 'A' && diff.kind !== 'N') {
            this.lhs = diff.lhs;
        }
        if (diff.kind !== 'A' && diff.kind !== 'D') {
            this.rhs = diff.rhs;
        }
        if (diff.kind !== 'E' && diff.kind !== 'D' && diff.kind !== 'N') {
            this.item = diff.item;
        }
        this.path = diff.path;
        this.isArray = (0, is_array_1.isArrayDiff)(diff);
        this.hasNestedChanges = diff.kind !== 'E' && diff.kind !== 'D' && diff.kind !== 'N' && (0, is_object_1.default)(diff.item);
        this.dotPath = (0, append_dot_path_1.appendDotPath)(diff);
    }
}
exports.default = Diff;
