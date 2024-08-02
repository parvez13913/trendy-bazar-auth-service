import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CustomerService } from "./customer.service";
import sendResponse from "../../../shared/sendResponse";
import { ICustomer } from "./custome.interface";
import httpStatus from "http-status";

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




export const CustomerController = {
  createCustomer,
};