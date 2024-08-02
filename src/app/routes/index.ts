import express from "express";
import { SellerRoutes } from "../modules/seller/seller.route";
import { CustomerRoutes } from "../modules/customer/customer.route";


const router = express.Router();



const moduleRoutes = [
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
];


moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;