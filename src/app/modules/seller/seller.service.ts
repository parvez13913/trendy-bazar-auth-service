import mongoose, { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { sellerSearchableFields } from "./seller.constants";
import { ISeller, ISellerFilters } from "./seller.interface";
import { Seller } from "./seller.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findOne({ _id: id });

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


const updateSeller = async (id: string, payload: Partial<ISeller>): Promise<ISeller | null> => {
  const isSellerExist = await Seller.findOne({ _id: id });

  if (!isSellerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Seller not found");
  };

  const result = await Seller.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};



const deleteSeller = async (id: string) => {
  const isUserExist = await Seller.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller does not exist');
  };

  let newSellerData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    newSellerData = await Seller.deleteOne({ _id: id }, { session });

    await User.deleteOne({ email: isUserExist?.email }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };
  return newSellerData

};






export const SellerService = {
  getAllSellers,
  getSingleSeller,
  updateSeller,
  deleteSeller
};