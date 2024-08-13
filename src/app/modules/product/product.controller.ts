import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await ProductService.createProduct(payload);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successsfully!!",
    data: result
  });
});




export const ProductController = {
  createProduct,
};