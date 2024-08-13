import express from "express";
import { BrandController } from "./brand.controller";

const router = express.Router();

router.get('/:id', BrandController.getSingleBrand);

router.get('/', BrandController.getAllBrands);

router.post('/createBrand', BrandController.createBrand);




export const BrandRoutes = router;