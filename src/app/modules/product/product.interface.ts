import { Model, Types } from "mongoose";
import { IBrand } from "../brand/brand.interface";

export type IProduct = {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  productImage?: string;
  brand: Types.ObjectId | IBrand;
};

export type IProductfilters = {
  searchTerm?: string;
  productName?: string;
  price?: string;
};


export type ProductModel = Model<IProduct, Record<string, unknown>>;