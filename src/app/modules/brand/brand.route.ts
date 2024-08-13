import express from "express";
import { BrandController } from "./brand.controller";

const router = express.Router();

router.post('/createBrand', BrandController.createBrand);




export const BrandRoutes = router;