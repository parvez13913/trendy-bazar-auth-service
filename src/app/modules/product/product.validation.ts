import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    productName: z.string({
      required_error: "Name is required"
    }),
    description: z.string({
      required_error: "Description is required"
    }),
    quantity: z.number(),
    price: z.number({
      required_error: "Price is required"
    }),
    productImage: z.string().optional(),

    brand: z.string({
      required_error: "Brand is required"
    })
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    productImage: z.string().optional(),

    brand: z.string().optional()
  }),
});


export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema
};