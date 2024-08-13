import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BrandService } from "./brand.service";
import { IBrand } from "./brand.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const result = await BrandService.createBrand(payload);


  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand created successsfully!!",
    data: result
  });
});



export const BrandController = {
  createBrand,
};