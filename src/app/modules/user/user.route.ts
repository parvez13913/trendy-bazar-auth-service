import express from "express";
import { UserController } from "./user.controller";


const router = express.Router();

router.post('/createSeller', UserController.createSeller);
router.post('/createCustomer', UserController.createCustomer);
router.post('/createAdmin', UserController.createAdmin);



export const UserRoutes = router;