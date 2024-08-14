import express from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";

const router = express.Router();


router.get('/:id', ProductController.getSingleProduct);

router.get('/', ProductController.getAllProducts);

router.post(
  '/createProduct',
  validateRequest(ProductValidation.createProductZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  ProductController.createProduct
);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  ProductController.deleteProduct
);


export const ProductRoutes = router;