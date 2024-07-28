import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const usersSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    // customer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Customer',
    // },
    // seller: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Seller',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', usersSchema);