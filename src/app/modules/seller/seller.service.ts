import { ISeller } from "./seller.interface";
import { Seller } from "./seller.model";

const createSeller = async (payload: ISeller): Promise<ISeller> => {
  const result = await Seller.create(payload);
  return result;
};











export const SellerService = {
  createSeller
}