import express from "express";
import { UserController } from "./user.controller";



const router = express.Router();


router.get("/", UserController.getAllUsers);
router.post("/createCustomer", UserController.createCustomer);
router.post("/createSeller", UserController.createSeller);
router.post("/createAdmin", UserController.createAdmin);



export const UserRoutes = router;