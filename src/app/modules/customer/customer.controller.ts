import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CustomerService } from "./customer.service";
import sendResponse from "../../../shared/sendResponse";
import { ICustomer } from "./custome.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { customerFilterableFields } from "./customer.constants";
import { paginationFields } from "../../../constants/paginationConstants";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const result = await CustomerService.createCustomer(payload);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successsfully!!",
    data: result
  });
});


const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CustomerService.getAllCustomers(filters, paginationOptions);

  sendResponse<ICustomer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customers fatched successsfully!!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CustomerService.getSingleCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer fetched successsfully!!",
    data: result
  });
});




export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
};