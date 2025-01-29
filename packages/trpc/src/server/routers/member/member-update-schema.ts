import { MemberUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const MemberUpdateSchema = MemberUpdateInput;

export type MemberUpdateSchema = z.infer<typeof MemberUpdateSchema>;
