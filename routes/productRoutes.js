import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const productRoutes = Router();
productRoutes.post("/", upload.single("image"), createProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:pid", getProduct);
productRoutes.put("/:pid", upload.single("image"), updateProduct);
productRoutes.delete("/:pid", deleteProduct);

export default productRoutes;