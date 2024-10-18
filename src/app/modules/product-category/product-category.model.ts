import { model, Schema } from 'mongoose';
import {
  IProductCategory,
  ProductCategoryModel,
} from './product-category.interface';

export const productCategorySchema = new Schema<
  IProductCategory,
  ProductCategoryModel
>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const ProductCategory = model<IProductCategory, ProductCategoryModel>(
  'ProductCategory',
  productCategorySchema,
);
