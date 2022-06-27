import * as z from "zod";

export const ClinicalConceptPutForm = z.object({
  displayName: z.string(),
  description: z.string(),
  alternateNames: z.array(z.string()),
  parentIds: z.array(z.number()),
  childIds: z.array(z.number()),
});

export type ClinicalConceptPut = z.infer<typeof ClinicalConceptPutForm>;
