import { Model } from "mongoose";

export type SellerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};


export type ISeller = {
  name: SellerName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  profileImage?: string;
};

export type ISellerFilters = {
  searchTerm?: string;
  email?: string;
  contactNo?: string;
};



export type SellerModel = Model<ISeller, Record<string, unknown>>;