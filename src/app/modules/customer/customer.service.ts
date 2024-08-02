import { ICustomer } from "./custome.interface";
import { Customer } from "./customer.model";

const createCustomer = async (payload: ICustomer): Promise<ICustomer> => {
  const result = await Customer.create(payload);

  return result;
};




export const CustomerService = {
  createCustomer,
};