import type deepDiff from 'deep-diff';
import { type DiffConfigWithoutTemplates } from '../../types';
export default function getPrefilter(config: DiffConfigWithoutTemplates): deepDiff.PreFilter<unknown, unknown> | undefined;
