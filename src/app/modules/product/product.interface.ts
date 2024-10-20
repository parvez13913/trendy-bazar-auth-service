import { Model, Types } from 'mongoose';
import { IProductCategory } from '../product-category/product-category.interface';

export type IProduct = {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  productImage?: string;
  productCategory: Types.ObjectId | IProductCategory;
};

export type IProductfilters = {
  searchTerm?: string;
  productName?: string;
  price?: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
