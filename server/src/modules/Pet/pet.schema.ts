import { z } from 'zod';

export const petSchema = z.object({
  name: z.string().min(1, "Pet name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().optional(),
  age: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  ownerId: z.string().uuid()
});

export type Pet = z.infer<typeof petSchema>;