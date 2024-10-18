import { z } from 'zod';

const createProductCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    logo: z.string().optional(),
  }),
});

const updateProductCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const ProductCategoryValidation = {
  createProductCategoryZodSchema,
  updateProductCategoryZodSchema,
};
