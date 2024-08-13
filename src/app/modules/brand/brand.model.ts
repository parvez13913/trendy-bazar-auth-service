import { IBrand, BrandModel } from './brand.interface';
import { model, Schema } from "mongoose";

export const brandSchema = new Schema<IBrand, BrandModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String
  },
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },

);


export const Brand = model<IBrand, BrandModel>('Brand', brandSchema);