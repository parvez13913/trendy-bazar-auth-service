import express from "express";
import { CustomerController } from "./customer.controller";



const router = express.Router();


router.post('/createCustomer', CustomerController.createCustomer);




export const CustomerRoutes = router;