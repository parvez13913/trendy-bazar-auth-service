import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { ISeller } from "../seller/seller.interface";
import { ICustomer } from "../customer/custome.interface";

export type IUser = {
  email: string;
  role: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: true | false;
  seller?: Types.ObjectId | ISeller;
  customer?: Types.ObjectId | ICustomer;
  admin?: Types.ObjectId | IAdmin;
};



export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<
    IUser,
    'email' | 'password' | 'role'
  > | null>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

