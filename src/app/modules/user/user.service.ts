import { Request } from 'express';
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Admin } from '../admin/admin.model';
import { Customer } from '../customer/customer.model';
import { Seller } from '../seller/seller.model';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';

const createCustomer = async (req: Request): Promise<IUser | null> => {
  const file = req.file as IUploadFile;
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

  const { ...user } = req.body;

  // set role
  user.role = 'customer';
  user.email = req.body?.email;
  req.body.profileImage = uploadedImage?.secure_url;
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Customer.create([req.body], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create customer');
    }

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newUserAllData;
};

const createSeller = async (req: Request): Promise<IUser | null> => {
  const file = req.file as IUploadFile;
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

  const { ...user } = req.body;
  // set role
  user.role = 'seller';
  user.email = req.body?.email;
  req.body.profileImage = uploadedImage?.secure_url;
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Seller.create([req.body], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create seller');
    }

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newUserAllData;
};

const createAdmin = async (req: Request): Promise<IUser | null> => {
  const file = req.file as IUploadFile;
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

  const { admin, ...user } = req.body;
  // set role
  user.role = 'admin';
  user.email = admin?.email;
  admin.profileImage = uploadedImage?.secure_url;
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Admin.create([admin], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create admin');
    }

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newUserAllData;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);
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

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email: email });

  return result;
};

const deleteUser = async (id: string) => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

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
    }

    newUserData = await User.deleteOne({ _id: id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newUserData;
};

export const UserService = {
  createCustomer,
  createSeller,
  createAdmin,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
