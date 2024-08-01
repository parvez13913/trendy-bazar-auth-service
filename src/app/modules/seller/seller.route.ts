import express from "express";
import { SellerController } from "./seller.controller";


const router = express.Router();

router.post('/createSeller', SellerController.createSeller);





export const SellerRoutes = router;