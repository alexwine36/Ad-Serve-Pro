import { z } from "zod";
import { MemberSchema } from "./generated";

export const MemberData = MemberSchema.extend({
  email: z
    .string()
    .email()
    .transform((v) => v.toLowerCase()),
  name: z.string().nullish(),
  image: z.string().nullish(),
});

export type MemberData = z.infer<typeof MemberData>;

export const MemberUpdateInput = MemberData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
})
  .extend({
    prevEmail: z.string(),
  })
  .omit({
    name: true,
    image: true,
  })
  .partial({
    organizationId: true,
  });

export type MemberUpdateInput = z.infer<typeof MemberUpdateInput>;

export const MemberInput = MemberUpdateInput;
export type MemberInput = z.infer<typeof MemberInput>;
