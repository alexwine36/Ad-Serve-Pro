import { z } from 'zod';

export const CompanyGetAllSchema = z.object({
  // Define your schema here
});

export type CompanyGetAllSchema = z.infer<typeof CompanyGetAllSchema>;
