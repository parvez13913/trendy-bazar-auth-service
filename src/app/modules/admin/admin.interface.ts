import { Model } from "mongoose";

export type AdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};


export type IAdmin = {
  password: string;
  role: string;
  name: AdminName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
};

export type IAdminFilters = {
  searchTerm?: string;
  email?: string;
  contactNo?: string;
};



export type AdminModel = Model<IAdmin, Record<string, unknown>>;