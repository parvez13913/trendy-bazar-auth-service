import { Model } from "mongoose";

export type IBrand = {
  name: string;
  description: string;
  logo?: string
};

export type IBrandfilters = {
  searchTerm?: string;
  name?: string;
  id?: string;
};



export type BrandModel = Model<IBrand, Record<string, unknown>>;