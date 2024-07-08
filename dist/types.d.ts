import type deepDiff from 'deep-diff';
import type DiffSentence from './sentence';
export type DefaultDiffConfig = {
    dateFormat: string;
    objectName: string;
    ignoreArrays: boolean;
    sensitivePaths: string[];
    dontHumanizePropertyNames: boolean;
    templates: {
        N: string;
        D: string;
        E: string;
        I: string;
        R: string;
        AE: string;
        NS: string;
        DS: string;
        ES: string;
        IS: string;
        RS: string;
        AES: string;
    };
};
export type DiffConfig = DefaultDiffConfig & {
    prefilter?: deepDiff.PreFilter<unknown, unknown> | undefined;
};
export type DiffConfigWithoutTemplates = Omit<DiffConfig, 'templates'>;
export type InputDiffConfig = Partial<{
    dateFormat: DefaultDiffConfig['dateFormat'];
    objectName: DefaultDiffConfig['objectName'];
    ignoreArrays: DefaultDiffConfig['ignoreArrays'];
    sensitivePaths: DefaultDiffConfig['sensitivePaths'];
    dontHumanizePropertyNames: DefaultDiffConfig['dontHumanizePropertyNames'];
    templates: Partial<DefaultDiffConfig['templates']>;
    prefilter: deepDiff.PreFilter<unknown, unknown> | undefined;
}>;
export type DiffEngineContext = {
    sentenceDiffs: DiffSentence[];
    sentences: string[];
    config: DiffConfigWithoutTemplates;
    templates: DefaultDiffConfig['templates'];
};
