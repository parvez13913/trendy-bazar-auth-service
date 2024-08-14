import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IProduct, IProductfilters } from "./product.interface";
import { Product } from "./product.model";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { productSearchableFields } from "./product.constants";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);

  return result;
};

const getAllProducts = async (filters: IProductfilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProduct[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  };

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  };

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  };

  const wereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Product.find(wereConditions);

  const total = await Product.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findOne({ _id: id });

  return result;
};


const updateProduct = async (id: string, payload: Partial<IProduct>): Promise<IProduct | null> => {
  const isProductExist = await Product.findOne({ _id: id });

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product does not exist");
  };

  const result = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};




export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};