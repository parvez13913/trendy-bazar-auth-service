import { model, Schema } from "mongoose";
import { ISeller, SellerModel } from "./seller.interface";
import { bloodGroup, gender } from "../../../enum/commonEnums";

export const sellerSchema = new Schema<ISeller, SellerModel>({
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
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
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



export const Seller = model<ISeller, SellerModel>('Seller', sellerSchema);