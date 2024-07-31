import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constants";
import { paginationFields } from "../../../constants/paginationConstants";
import { IUser } from "./user.interface";

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { seller, ...userData } = req.body;
  const result = await UserService.createSeller(userData, seller);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully!',
    data: result,
  });
});

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customer, ...userData } = req.body;
  const result = await UserService.createCustomer(userData, customer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(userData, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});




export const UserController = {
  createSeller,
  createCustomer,
  createAdmin,
  getAllUsers
};