import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();


router.get('/:id', ProductController.getSingleProduct);

router.get('/', ProductController.getAllProducts);

router.post('/createProduct', ProductController.createProduct);

router.patch('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);


export const ProductRoutes = router;