import { Router } from "express";
import { createProduct, getProduct, getProducts } from "../controllers/productControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const productRoutes = Router();
productRoutes.post("/", upload.single("image"), createProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:pid", getProduct);

export default productRoutes;