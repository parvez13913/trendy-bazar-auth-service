import { Seller } from "../seller/seller.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse | null> => {
  const { id, password } = payload;

  const isSellerExist = await Seller.findById
};




export const AuthService = {
  loginUser,
}