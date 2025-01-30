import { CompanyContactInput } from "@repo/common-types";
import type { z } from "zod";

export const CompanyContactCreateSchema = CompanyContactInput;

export type CompanyContactCreateSchema = z.infer<
  typeof CompanyContactCreateSchema
>;
