import express from 'express';
import { ENUM_USER_ROLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryValidation } from './product-category.validation';

const router = express.Router();

router.get('/:id', ProductCategoryController.getSingleProductCategory);

router.get('/', ProductCategoryController.getAllProductCategories);

router.post(
  '/create-product-category',
  validateRequest(ProductCategoryValidation.createProductCategoryZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductCategoryController.createProductCategory,
);

router.patch(
  '/:id',
  validateRequest(ProductCategoryValidation.createProductCategoryZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductCategoryController.updateProductCategory,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductCategoryController.deleteProductCategory,
);

export const ProductCategoryRoutes = router;
