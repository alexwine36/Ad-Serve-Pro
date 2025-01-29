import { z } from 'zod';

const BaseGetOneSchema = z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
});

export const GetOneSchema = z.union([
  BaseGetOneSchema.required({
    id: true,
  }),
  BaseGetOneSchema.required({
    slug: true,
  }),
]);

export type GetOneSchema = z.infer<typeof GetOneSchema>;
