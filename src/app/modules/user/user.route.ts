import express from "express";
import { UserController } from "./user.controller";



const router = express.Router();

router.post("/createCustomer", UserController.createCustomer);



export const UserRoutes = router;