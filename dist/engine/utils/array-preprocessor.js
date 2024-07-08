"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preProcessArrayDiffs = exports.splitPath = void 0;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
function splitPath(path) {
    return path.split(/[.[\]]/gi).filter(Boolean);
}
exports.splitPath = splitPath;
function preProcessArrayDiffs(diffs = [], lhs = [], rhs = []) {
    const groupedDiffs = groupDiffsByPath(diffs);
    let diffStrings = [];
    for (const path in groupedDiffs) {
        if (Object.prototype.hasOwnProperty.call(groupedDiffs, path)) {
            let lhsValue = lhs;
            let rhsValue = rhs;
            for (const p of splitPath(path)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                lhsValue = lhsValue[p];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                rhsValue = rhsValue[p];
            }
            const groupedDiff = groupedDiffs[path];
            const { insertions, cutoff } = getInsertions(lhsValue, rhsValue);
            const changes = [
                ...insertions,
                ...groupedDiff
                    .filter((diff) => Number(diff.index) < cutoff && diff.kind === 'E')
                    .map((diff) => ({
                    ...diff,
                    dotPath: path,
                    kind: 'AE',
                    path: splitPath(path),
                })),
            ].map((diff) => ({
                ...diff,
                path: splitPath(path),
                dotPath: path,
            }));
            diffStrings = [...diffStrings, ...changes];
        }
    }
    return diffStrings;
}
exports.preProcessArrayDiffs = preProcessArrayDiffs;
function groupDiffsByPath(diffs) {
    const diffGroups = {};
    for (const diff of diffs) {
        diff.index = diff.index ?? (Array.isArray(diff.path) ? Number(diff.path[diff.path.length - 1]) : 0);
        if (diffGroups[diff.dotPath] && Array.isArray(diffGroups[diff.dotPath])) {
            diffGroups[diff.dotPath].push(diff);
        }
        else {
            diffGroups[diff.dotPath] = [diff];
        }
    }
    return diffGroups;
}
function getInsertions(lhs = [], rhs = []) {
    if (!Array.isArray(lhs) || !Array.isArray(rhs)) {
        return {
            cutoff: 0,
            insertions: [],
        };
    }
    const insertionCount = rhs.length - lhs.length;
    const kind = insertionCount !== 0 && insertionCount > 0 ? 'I' : 'R';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const longer = kind === 'I' ? [...rhs] : [...lhs];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const shorter = kind === 'I' ? [...lhs] : [...rhs];
    const longerLength = longer.length;
    const insertions = [];
    let absCount = Math.abs(insertionCount);
    let negIndex = 0;
    while (absCount !== 0) {
        negIndex -= 1;
        if ((0, fast_deep_equal_1.default)(longer[longer.length - 1], shorter[longer.length - 1 - absCount])) {
            longer.pop();
            shorter.pop();
        }
        else {
            const value = longer.pop();
            const index = longerLength - Math.abs(negIndex);
            insertions.push({
                kind,
                index,
                val: value,
            });
            absCount -= 1;
        }
    }
    return {
        insertions,
        cutoff: Math.min(...insertions.map((ins) => ins.index)),
    };
}
