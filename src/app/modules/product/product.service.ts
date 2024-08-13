import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);

  return result;
};




export const ProductService = {
  createProduct,
};