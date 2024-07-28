import { Model } from "mongoose";

export type CustomerName = {
  firstName: string;
  middleName: string;
  lastName: string;
};


export type ICustomer = {
  id: string;
  name: CustomerName;
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



export type CustomerModel = Model<ICustomer, Record<string, unknown>>;