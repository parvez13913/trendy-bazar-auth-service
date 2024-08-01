import express from "express";
import { SellerRoutes } from "../modules/seller/seller.route";


const router = express.Router();



const moduleRoutes = [
  {
    path: '/sellers',
    route: SellerRoutes,
  },
];


moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;