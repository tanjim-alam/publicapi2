import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { createCategory } from "../controllers/categoryControllers.js";

const categoryRoutes = Router();

categoryRoutes.post("/", upload.single("image"), createCategory);

export default categoryRoutes;