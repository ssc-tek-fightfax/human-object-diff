import type Diff from '../../diff';
import { type DiffConfig } from '../../types';
export type Change = {
    path: string[];
    dotPath: string;
    kind: 'I' | 'R';
    index: number;
    val: unknown;
} | {
    path: string[];
    dotPath: string;
    kind: keyof DiffConfig['templates'];
    isArray: boolean;
    lhs: unknown;
    rhs: unknown;
    index: number | undefined;
    val: unknown;
};
export declare function splitPath(path: string): string[];
export declare function preProcessArrayDiffs(diffs?: Diff[], lhs?: unknown, rhs?: unknown): Array<string | Change>;
