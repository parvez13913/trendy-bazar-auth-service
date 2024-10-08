import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BrandService } from "./brand.service";
import { IBrand } from "./brand.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { brandFilterableFields } from "./brand.constants";
import { paginationFields } from "../../../constants/paginationConstants";

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


const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, brandFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BrandService.getAllBrands(filters, paginationOptions);


  sendResponse<IBrand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brands data fetched successsfully!!",
    meta: result.meta,
    data: result.data
  });
});

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BrandService.getSingleBrand(id);


  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand data fetched successsfully!!",
    data: result
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await BrandService.updateBrand(id, payload);


  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand updated successsfully!!",
    data: result
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BrandService.deleteBrand(id);


  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand deleted successsfully!!",
    data: result
  });
});



export const BrandController = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand
};