import { model, Schema } from "mongoose";
import { CustomerModel, ICustomer } from "./custome.interface";
import { bloodGroup, gender } from "../../../enum/commonEnums";

export const customerSchema = new Schema<ICustomer, CustomerModel>({
  name: {
    type: {
      firstName: {
        type: String,
        require: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  gender: {
    type: String,
    enum: gender,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContactNo: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  profileImage: {
    type: String,
  },
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);



export const Customer = model<ICustomer, CustomerModel>('Customer', customerSchema);