import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { ISeller } from "../seller/seller.interface";
import { ICustomer } from "../customer/custome.interface";

export type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  email: string;
  role: string;
  password: string;
  name?: Name;
  gender?: string;
  contactNo?: string;
  profileImage?: string;
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


export type IUserFilters = {
  searchTerm?: string;
  email?: string;
};

