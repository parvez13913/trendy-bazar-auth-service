import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constants";
import { paginationFields } from "../../../constants/paginationConstants";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createCustomer(req);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successsfully!!",
    data: result
  });
});

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createSeller(req);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller created successsfully!!",
    data: result
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successsfully!!",
    data: result
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched successsfully!!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data fetched successsfully!!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successsfully!!",
    data: result,
  });
});




export const UserController = {
  createCustomer,
  createSeller,
  createAdmin,
  getAllUsers,
  getSingleUser,
  deleteUser
};