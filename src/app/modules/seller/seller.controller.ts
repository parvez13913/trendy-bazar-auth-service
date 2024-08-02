import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SellerService } from "./seller.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ISeller } from "./seller.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/paginationConstants";
import { sellerFilterableFields } from "./seller.constants";

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


const getAllSellers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, sellerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await SellerService.getAllSellers(filters, paginationOptions);

  sendResponse<ISeller[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sellers data fetched successsfully!!",
    meta: result.meta,
    data: result.data,
  });
});


const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await SellerService.getSingleSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller data fetched successsfully!!",
    data: result,
  });
});

const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await SellerService.updateSeller(id, payload);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller updated successsfully!!",
    data: result,
  });
});





export const SellerController = {
  createSeller,
  getAllSellers,
  getSingleSeller,
  updateSeller,
};