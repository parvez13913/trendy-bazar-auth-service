import { AdminValidation } from './admin.validation';
import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();


router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  AdminController.getSingleAdmin
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  AdminController.getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  AdminController.deleteAdmin
);




export const AdminRoutes = router;