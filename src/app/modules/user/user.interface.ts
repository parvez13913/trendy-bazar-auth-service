import { Model, Types } from "mongoose";
import { ICustomer } from "../customer/custome.interface";
import { ISeller } from "../seller/seller.interface";
import { IAdmin } from "../admin/admin.interface";

export type IUser = {
  role: string,
  userId: string,
  password: string,
  customer?: Types.ObjectId | ICustomer,
  seller?: Types.ObjectId | ISeller,
  admin?: Types.ObjectId | IAdmin,
};


export type IUserFilters = {
  searchTerm?: string;
  role?: string;
}



export type UserModel = Model<IUser, Record<string, unknown>>;