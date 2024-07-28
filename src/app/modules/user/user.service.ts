import mongoose from "mongoose";
import { ISeller } from "../seller/seller.interface";
import { IUser } from "./user.interface";
import { Seller } from "../seller/seller.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "./user.model";

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
  createSeller
}