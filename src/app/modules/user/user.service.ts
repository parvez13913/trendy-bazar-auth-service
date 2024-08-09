import mongoose from "mongoose";
import { ICustomer } from "../customer/custome.interface";
import { IUser } from "./user.interface";
import { Customer } from "../customer/customer.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "./user.model";

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




export const UserService = {
  createCustomer,
}