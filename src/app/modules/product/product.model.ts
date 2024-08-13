import { model, Schema, Types } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

export const productSchema = new Schema<IProduct, ProductModel>({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  }
},

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);


export const Product = model<IProduct, ProductModel>('Product', productSchema);