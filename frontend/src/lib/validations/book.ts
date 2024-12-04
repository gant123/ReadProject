import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author name is required'),
  completionDate: z.string().min(1, 'Completion date is required'),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().max(500, 'Review must be less than 500 characters').optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;