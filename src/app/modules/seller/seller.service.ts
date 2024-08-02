import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { sellerSearchableFields } from "./seller.constants";
import { ISeller, ISellerFilters } from "./seller.interface";
import { Seller } from "./seller.model";

const createSeller = async (payload: ISeller): Promise<ISeller> => {
  const result = await Seller.create(payload);
  return result;
};

const getAllSellers = async (filters: ISellerFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ISeller[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: sellerSearchableFields.map(field => ({
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

  const result = await Seller.find(wereConditions);

  const total = await Seller.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };

};











export const SellerService = {
  createSeller,
  getAllSellers,
};