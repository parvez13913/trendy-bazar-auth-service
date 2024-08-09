import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const result = await AdminService.createAdmin(payload);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successsfully!!",
    data: result
  });
});



export const AdminController = {
  createAdmin,
};