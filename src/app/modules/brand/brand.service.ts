import { IBrand } from "./brand.interface";
import { Brand } from "./brand.model";

const createBrand = async (payload: IBrand): Promise<IBrand> => {
  const result = await Brand.create(payload);

  return result;
};








export const BrandService = {
  createBrand,
};