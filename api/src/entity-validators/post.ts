import * as z from 'zod';

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be 1 character at least')
    .max(100, 'Title must be 100 characters at most'),
  text: z
    .string()
    .max(10000, 'Text must be 10000 characters at most')
    .optional(),
  description: z
    .string()
    .max(300, 'Description must be 300 characters at most')
    .optional(),
  categories: z
    .string()
    .array()
    .max(10, 'Must be 10 categories at most')
    .optional(),
  displayType: z.number().min(0).max(2).optional(),
});

export const makePost = (data: unknown) => createPostSchema.parse(data);
