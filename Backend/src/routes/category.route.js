import { Router } from "express";
import {
    addCategories,
    deleteCategories,
    getCategories,
} from "../controller/categories.controller.js";
import { verifyJwt, hasRole } from "../middleware/auth.middleware.js";

const categoryRoute = Router();
categoryRoute.use(verifyJwt);
categoryRoute.use(hasRole("admin"));

categoryRoute.get("/categories", getCategories);
categoryRoute.post("/add-category", addCategories);
categoryRoute.delete("/delete-category/:id", deleteCategories);
export default categoryRoute;
