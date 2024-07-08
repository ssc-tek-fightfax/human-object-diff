import { type DiffEngineContext } from '../types';
export declare function humanReadableDiffGenerator(context: DiffEngineContext): (lhs: unknown, rhs: unknown) => string[];
