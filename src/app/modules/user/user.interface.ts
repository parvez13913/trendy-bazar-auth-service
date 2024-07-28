import { Model, Types } from "mongoose";

export type IUser = {
  id: string,
  role: string,
  password: string,
  // customer?:Types.ObjectId|ICustomer,
  // seller?:Types.ObjectId|ISeller,
  // admin?:Types.ObjectId|IAdmin,
};



export type UserModel = Model<IUser, Record<string, unknown>>;