import express from "express";
import { BrandController } from "./brand.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BrandValidation } from "./brand.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";

const router = express.Router();

router.get('/:id', BrandController.getSingleBrand);

router.get('/', BrandController.getAllBrands);

router.post(
  '/createBrand',
  validateRequest(BrandValidation.createBrandZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  BrandController.createBrand
);

router.patch(
  '/:id',
  validateRequest(BrandValidation.createBrandZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  BrandController.updateBrand
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  BrandController.deleteBrand
);




export const BrandRoutes = router;