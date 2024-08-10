import express from "express";
import { UserController } from "./user.controller";



const router = express.Router();


router.get("/:id", UserController.getSingleUser);
router.get("/", UserController.getAllUsers);
router.post("/createCustomer", UserController.createCustomer);
router.post("/createSeller", UserController.createSeller);
router.post("/createAdmin", UserController.createAdmin);
router.delete("/:id", UserController.deleteUser);



export const UserRoutes = router;