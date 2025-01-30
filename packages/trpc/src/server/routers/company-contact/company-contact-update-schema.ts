import { CompanyContactUpdateInput } from "@repo/common-types";
import type { z } from "zod";

export const CompanyContactUpdateSchema = CompanyContactUpdateInput;

export type CompanyContactUpdateSchema = z.infer<
  typeof CompanyContactUpdateSchema
>;
