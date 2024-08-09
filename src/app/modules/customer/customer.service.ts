import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICustomer, ICustomerilters } from "./custome.interface";
import { customerSearchableFields } from "./customer.constants";
import { Customer } from "./customer.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";


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
  const isCustomerExist = await Customer.findOne({ _id: id });

  if (!isCustomerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Customer is not found");
  };

  const result = await Customer.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};

const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
  const isCustomerExist = await Customer.findOne({ _id: id });

  if (!isCustomerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Customer is not found");
  };

  const result = await Customer.findOneAndDelete({ _id: id });

  return result;
};




export const CustomerService = {
  getSingleCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};