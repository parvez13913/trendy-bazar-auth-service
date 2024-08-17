import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";



const router = express.Router();


router.get(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  UserController.getSingleUser
);

router.get(
  "/",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  UserController.getAllUsers
);

router.post(
  "/createCustomer",
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createCustomerZodSchema.parse(JSON.parse(req.body.data));

    return UserController.createCustomer(req, res, next);
  }
);

router.post(
  "/createSeller",
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createSellerZodSchema.parse(JSON.parse(req.body.data));

    return UserController.createSeller(req, res, next);
  }
);

router.post(
  "/createAdmin",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminZodSchema.parse(JSON.parse(req.body.data));

    return UserController.createAdmin(req, res, next);
  }
);

router.delete(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  UserController.deleteUser
);



export const UserRoutes = router;