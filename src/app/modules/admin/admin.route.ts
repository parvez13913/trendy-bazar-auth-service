import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();


router.get('/', AdminController.getAllAdmins);
router.post('/createAdmin', AdminController.createAdmin);




export const AdminRoutes = router;