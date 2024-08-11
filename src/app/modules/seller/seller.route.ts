import express from "express";
import { SellerController } from "./seller.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SellerValidation } from "./seller.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";


const router = express.Router();

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  SellerController.getSingleSeller
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  SellerController.getAllSellers
);

router.patch(
  '/:id',
  validateRequest(SellerValidation.updateSellerZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  SellerController.updateSeller
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  SellerController.deleteSeller
);





export const SellerRoutes = router;