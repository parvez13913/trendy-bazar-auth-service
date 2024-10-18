import { Model } from 'mongoose';

export type IProductCategory = {
  name: string;
  description: string;
  logo?: string;
};

export type IProductCategoryFilters = {
  searchTerm?: string;
  name?: string;
  id?: string;
};

export type ProductCategoryModel = Model<
  IProductCategory,
  Record<string, unknown>
>;
