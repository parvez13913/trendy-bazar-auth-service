import mongoose, { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICustomer, ICustomerilters } from "./custome.interface";
import { customerSearchableFields } from "./customer.constants";
import { Customer } from "./customer.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";


const getAllCustomers = async (filters: ICustomerilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ICustomer[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: customerSearchableFields.map(field => ({
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

  const result = await Customer.find(wereConditions);

  const total = await Customer.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCustomer = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findById(id);

  return result;
};

const updateCustomer = async (id: string, payload: Partial<ICustomer>): Promise<ICustomer | null> => {
  const isCustomerExist = await Customer.findById(id);

  if (!isCustomerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found');
  };


  let updateCustomerData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    updateCustomerData = await Customer.findOneAndUpdate({ _id: id }, payload, { session });

    await User.findOneAndUpdate({ email: isCustomerExist?.email }, payload, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };
  return updateCustomerData;

};

const deleteCustomer = async (id: string) => {
  const isUserExist = await Customer.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer does not exist');
  };

  let newCustomerData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    newCustomerData = await Customer.deleteOne({ _id: id }, { session });

    await User.deleteOne({ email: isUserExist?.email }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };
  return newCustomerData

};




export const CustomerService = {
  getSingleCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
}