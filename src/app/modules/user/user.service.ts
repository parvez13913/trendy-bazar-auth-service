import mongoose, { SortOrder } from "mongoose";
import { ICustomer } from "../customer/custome.interface";
import { IUser, IUserFilters } from "./user.interface";
import { Customer } from "../customer/customer.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "./user.model";
import { ISeller } from "../seller/seller.interface";
import { Seller } from "../seller/seller.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userSearchableFields } from "./user.constants";

const createCustomer = async (user: IUser, customer: ICustomer): Promise<IUser | null> => {

  // set role
  user.role = 'customer';
  user.email = customer?.email;
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

const createSeller = async (user: IUser, seller: ISeller): Promise<IUser | null> => {

  // set role
  user.role = 'seller';
  user.email = seller?.email;
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Seller.create([seller], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create seller');
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
  user.email = admin?.email;
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Admin.create([admin], { session });

    if (!newCustomer.length) {
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

const getAllUsers = async (filters: IUserFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(wereConditions);

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


const deleteUser = async (id: string) => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  };

  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (isUserExist?.role === 'admin') {
      await Admin.deleteOne({ email: isUserExist?.email }, { session });
    } else if (isUserExist?.role === 'seller') {
      await Seller.deleteOne({ email: isUserExist?.email }, { session });
    } else if (isUserExist?.role === 'customer') {
      await Customer.deleteOne({ email: isUserExist?.email }, { session });
    };

    newUserData = await User.deleteOne({ _id: id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };
  return newUserData

};




export const UserService = {
  createCustomer,
  createSeller,
  createAdmin,
  getAllUsers,
  getSingleUser,
  deleteUser
};