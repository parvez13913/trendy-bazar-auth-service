import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SellerService } from "./seller.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SellerService.createSeller(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller created successsfully!!",
    data: result
  });
});










export const SellerController = {
  createSeller,
};