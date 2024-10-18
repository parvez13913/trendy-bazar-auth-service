import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { productCategoryFilterableFields } from './product-category.constants';
import {
  IProductCategory,
  IProductCategoryFilters,
} from './product-category.interface';
import { ProductCategory } from './product-category.model';

const createProductCategory = async (
  payload: IProductCategory,
): Promise<IProductCategory> => {
  const result = await ProductCategory.create(payload);

  return result;
};

const getAllProductCategories = async (
  filters: IProductCategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProductCategory[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: productCategoryFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const wereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await ProductCategory.find(wereConditions);

  const total = await ProductCategory.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProductCategory = async (
  id: string,
): Promise<IProductCategory | null> => {
  const result = await ProductCategory.findOne({ _id: id });

  return result;
};

const updateProductCategory = async (
  id: string,
  payload: Partial<IProductCategory>,
): Promise<IProductCategory | null> => {
  const isProductCategoryExist = await ProductCategory.findOne({ _id: id });

  if (!isProductCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductCategory does not exist');
  }

  const result = await ProductCategory.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteProductCategory = async (
  id: string,
): Promise<IProductCategory | null> => {
  const isProductCategoryExist = await ProductCategory.findOne({ _id: id });

  if (!isProductCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductCategory does not exist');
  }

  const result = await ProductCategory.findOneAndDelete({ _id: id });

  return result;
};

export const ProductCategoryService = {
  createProductCategory,
  getAllProductCategories,
  getSingleProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
