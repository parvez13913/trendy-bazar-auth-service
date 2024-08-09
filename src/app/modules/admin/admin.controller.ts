import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constants";
import { paginationFields } from "../../../constants/paginationConstants";

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


const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successsfully!!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successsfully!!",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await AdminService.updateAdmin(id, payload);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successsfully!!",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successsfully!!",
    data: result,
  });
});



export const AdminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin
};