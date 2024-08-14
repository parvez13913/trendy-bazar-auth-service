import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { productFilterableFields } from "./product.constants";
import { paginationFields } from "../../../constants/paginationConstants";

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

const getAllProducts = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ProductService.getAllProducts(filters, paginationOptions);

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products data fetched successsfully!!",
    meta: result.meta,
    data: result.data
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProduct(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product data fetched successsfully!!",
    data: result
  });
});




export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};