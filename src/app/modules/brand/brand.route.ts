import express from "express";
import { BrandController } from "./brand.controller";

const router = express.Router();

router.get('/:id', BrandController.getSingleBrand);

router.get('/', BrandController.getAllBrands);

router.post('/createBrand', BrandController.createBrand);

router.patch('/:id', BrandController.updateBrand);

router.delete('/:id', BrandController.deleteBrand);




export const BrandRoutes = router;