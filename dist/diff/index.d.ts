import type deepDiff from 'deep-diff';
export default class Diff {
    readonly isArray: boolean;
    readonly lhs: unknown;
    readonly rhs: unknown;
    index: number | undefined;
    readonly path: unknown[] | undefined;
    val: unknown;
    readonly dotPath: string;
    readonly kind: 'N' | 'D' | 'A' | 'E';
    private readonly item;
    private readonly hasNestedChanges;
    constructor(diff: deepDiff.Diff<unknown, unknown>);
}
