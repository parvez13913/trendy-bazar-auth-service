import mongoose, { SortOrder } from "mongoose";
import { ISeller } from "../seller/seller.interface";
import { IUser, IUserFilters } from "./user.interface";
import { Seller } from "../seller/seller.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "./user.model";
import { ICustomer } from "../customer/custome.interface";
import { Customer } from "../customer/customer.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { userFilterableFields } from "./user.constants";

const createSeller = async (user: IUser, seller: ISeller): Promise<IUser | null> => {

  // set role
  user.role = 'seller';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create seller');
    };

    console.log(newSeller)

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    };

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };

  return newUserAllData;
};


const createCustomer = async (user: IUser, customer: ICustomer): Promise<IUser | null> => {

  // set role
  user.role = 'customer';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Customer.create([customer], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create customer');
    };

    const newUser = await User.create([user], { session });


    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    };

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };

  return newUserAllData;
};


const createAdmin = async (user: IUser, admin: IAdmin): Promise<IUser | null> => {

  // set role
  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create admin');
    };

    const newUser = await User.create([user], { session });


    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    };

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };

  return newUserAllData;
};


const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, sortBy, sortOrder, skip } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userFilterableFields.map(field => ({
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
  }

  const wereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await User.find(wereConditions).
    sort(sortConditions).
    skip(skip).
    limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });

  return result;
};


const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  };

  const result = await User.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};

const deleteUser = async (id: string) => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  };
  let deletedUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (isUserExist.role === 'admin') {
      deletedUser = await Admin.deleteOne({ _id: id }, { session });
    } else if (isUserExist.role === 'seller') {
      deletedUser = await Seller.deleteOne({ _id: id }, { session });
    } else {
      deletedUser = await Customer.deleteOne({ role: isUserExist?.role }, { session });
    };

    deletedUser = await User.deleteOne({ _id: id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };

  return deletedUser;
};

export const UserService = {
  createSeller,
  createCustomer,
  createAdmin,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};