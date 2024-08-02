import { ICustomer } from "./custome.interface";
import { Customer } from "./customer.model";

const createCustomer = async (payload: ICustomer): Promise<ICustomer> => {
  const result = await Customer.create(payload);

  return result;
};

const getSingleCustomer = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findById(id);

  return result;
};




export const CustomerService = {
  createCustomer,
  getSingleCustomer,
};