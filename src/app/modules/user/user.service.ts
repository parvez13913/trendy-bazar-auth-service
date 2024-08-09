import mongoose from "mongoose";
import { ICustomer } from "../customer/custome.interface";
import { IUser } from "./user.interface";
import { Customer } from "../customer/customer.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "./user.model";
import { ISeller } from "../seller/seller.interface";
import { Seller } from "../seller/seller.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

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




export const UserService = {
  createCustomer,
  createSeller,
  createAdmin,
}