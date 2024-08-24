import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const productRoutes = Router();
productRoutes.post("/", upload.single("image"), createProduct);
productRoutes.get("/", getProducts);

export default productRoutes;