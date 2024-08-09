import express from "express";
import { CustomerController } from "./customer.controller";



const router = express.Router();


router.get('/:id', CustomerController.getSingleCustomer);
router.get('/', CustomerController.getAllCustomers);
router.post('/createCustomer', CustomerController.createCustomer);
router.patch('/:id', CustomerController.updateCustomer);




export const CustomerRoutes = router;