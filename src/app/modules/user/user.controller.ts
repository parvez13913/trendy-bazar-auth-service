import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { IUser } from "./user.interface";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customer, ...userData } = req.body;
  const result = await UserService.createCustomer(userData, customer);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successsfully!!",
    data: result
  });
});




export const UserController = {
  createCustomer,
}