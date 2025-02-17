import { z } from "zod";

export const AdPlacementGetAllSchema =
z.object({
// Define your schema here
})

export type AdPlacementGetAllSchema = z.infer<typeof AdPlacementGetAllSchema>;