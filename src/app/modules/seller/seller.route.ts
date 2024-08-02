import express from "express";
import { SellerController } from "./seller.controller";


const router = express.Router();

router.get('/:id', SellerController.getSingleSeller);

router.get('/', SellerController.getAllSellers);

router.post('/createSeller', SellerController.createSeller);

router.patch('/:id', SellerController.updateSeller);





export const SellerRoutes = router;