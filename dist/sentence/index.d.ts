import { type DiffConfig, type DiffConfigWithoutTemplates } from '../types';
import { type Change } from '../engine/utils/array-preprocessor';
import type Diff from '../diff';
export type DiffContext = {
    diff: string | Change | Diff;
    config: DiffConfigWithoutTemplates;
    templates: DiffConfig['templates'];
};
export default class DiffSentence {
    private readonly template;
    private readonly diff;
    private readonly 'FIELD';
    private readonly 'DOTPATH';
    private readonly 'NEWVALUE';
    private readonly 'OLDVALUE';
    private readonly 'INDEX';
    private readonly 'POSITION';
    constructor(diff: string | Change | Diff, config: DiffConfigWithoutTemplates, templates: DiffConfig['templates']);
    format(): string;
    getTemplate({ config, templates, diff }: DiffContext): string;
    private getTemplateKey;
}
