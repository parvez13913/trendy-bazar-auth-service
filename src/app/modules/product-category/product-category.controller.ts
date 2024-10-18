import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { productCategorySearchableFields } from './product-category.constants';
import { IProductCategory } from './product-category.interface';
import { ProductCategoryService } from './product-category.service';

const createProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    console.log(payload);

    const result = await ProductCategoryService.createProductCategory(payload);

    sendResponse<IProductCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product category created successfully!!',
      data: result,
    });
  },
);

const getAllProductCategories = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productCategorySearchableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ProductCategoryService.getAllProductCategories(
      filters,
      paginationOptions,
    );

    sendResponse<IProductCategory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product category data fetched successfully!!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProductCategoryService.getSingleProductCategory(id);

    sendResponse<IProductCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product category data fetched successfully!!',
      data: result,
    });
  },
);

const updateProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await ProductCategoryService.updateProductCategory(
      id,
      payload,
    );

    sendResponse<IProductCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product category updated successfully!!',
      data: result,
    });
  },
);

const deleteProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProductCategoryService.deleteProductCategory(id);

    sendResponse<IProductCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ProductCategory deleted successfully!!',
      data: result,
    });
  },
);

export const ProductCategoryController = {
  createProductCategory,
  getAllProductCategories,
  getSingleProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
