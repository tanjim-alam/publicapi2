import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryControllers.js";

const categoryRoutes = Router();

categoryRoutes.post("/", upload.single("image"), createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:cid", getCategory);
categoryRoutes.put("/:cid", upload.single("image"), updateCategory);
categoryRoutes.delete("/:cid", deleteCategory);

export default categoryRoutes;