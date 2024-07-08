"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPrefilter(config) {
    let prefilter;
    if (config.prefilter && Array.isArray(config.prefilter)) {
        prefilter = (path, key) => Boolean(Array.isArray(path) &&
            path.length === 0 &&
            config.prefilter &&
            Array.isArray(config.prefilter) &&
            config.prefilter.includes(key));
    }
    else if (typeof config.prefilter === 'function') {
        prefilter = config.prefilter;
    }
    return prefilter;
}
exports.default = getPrefilter;
