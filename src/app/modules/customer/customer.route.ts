import express from "express";
import { CustomerController } from "./customer.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidation } from "./customer.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";



const router = express.Router();


router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  CustomerController.getSingleCustomer
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  CustomerController.getAllCustomers
);

router.patch(
  '/:id',
  validateRequest(CustomerValidation.updateCustomerZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  CustomerController.updateCustomer
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  CustomerController.deleteCustomer
);




export const CustomerRoutes = router;