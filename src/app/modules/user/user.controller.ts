import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createSeller = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { seller, ...userData } = req.body;
  const result = await UserService.createSeller(userData, seller);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully!',
    data: result,
  });
});






export const UserController = {
  createSeller
}