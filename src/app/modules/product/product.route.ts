import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();


router.get('/:id', ProductController.getSingleProduct);

router.get('/', ProductController.getAllProducts);

router.post('/createProduct', ProductController.createProduct);


export const ProductRoutes = router;