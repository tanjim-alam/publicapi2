import { Router } from "express";
import { createProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const productRoutes = Router();
productRoutes.post("/", upload.single("image"), createProduct);

export default productRoutes;