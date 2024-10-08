import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { brandSearchableFields } from "./brand.constants";
import { IBrand, IBrandfilters } from "./brand.interface";
import { Brand } from "./brand.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createBrand = async (payload: IBrand): Promise<IBrand> => {
  const result = await Brand.create(payload);

  return result;
};


const getAllBrands = async (filters: IBrandfilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IBrand[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: brandSearchableFields.map(field => ({
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

  const result = await Brand.find(wereConditions);

  const total = await Brand.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getSingleBrand = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findOne({ _id: id });

  return result;
};

const updateBrand = async (id: string, payload: Partial<IBrand>): Promise<IBrand | null> => {
  const isBrandExist = await Brand.findOne({ _id: id });

  if (!isBrandExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand does not exist");
  };

  const result = await Brand.findOneAndUpdate({ _id: id }, payload, { new: true });


  return result;
};

const deleteBrand = async (id: string): Promise<IBrand | null> => {
  const isBrandExist = await Brand.findOne({ _id: id });

  if (!isBrandExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand does not exist");
  };

  const result = await Brand.findOneAndDelete({ _id: id });


  return result;
};





export const BrandService = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand
};