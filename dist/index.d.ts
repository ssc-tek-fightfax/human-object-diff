import type DiffSentence from './sentence';
import { type InputDiffConfig } from './types';
declare class DiffEngine {
    diff: (lhs: unknown, rhs: unknown) => string[];
    protected readonly sentenceDiffs: DiffSentence[];
    protected readonly sentences: string[];
    private readonly config;
    private readonly templates;
    constructor(config?: InputDiffConfig);
}
export default DiffEngine;
