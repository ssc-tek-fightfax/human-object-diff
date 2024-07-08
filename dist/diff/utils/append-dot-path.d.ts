import type deepDiff from 'deep-diff';
export declare function appendDotPath(diff: deepDiff.Diff<unknown, unknown>): string;
export declare function dotPathReducer(diff: {
    path: any[] | undefined | string[] | unknown[];
}): (acc: string, value: unknown, i: number) => string;
