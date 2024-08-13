import express from "express";
import { SellerRoutes } from "../modules/seller/seller.route";
import { CustomerRoutes } from "../modules/customer/customer.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BrandRoutes } from "../modules/brand/brand.route";


const router = express.Router();



const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
];


moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;