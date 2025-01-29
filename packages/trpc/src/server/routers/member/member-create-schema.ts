import { MemberInput } from '@repo/common-types';
import type { z } from 'zod';

export const MemberCreateSchema = MemberInput;

export type MemberCreateSchema = z.infer<typeof MemberCreateSchema>;
