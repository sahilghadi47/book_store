import { Router } from "express";
const cartRouter = Router();
import {
    addToCart,
    removeFromCart,
    getCart,
} from "../controller/cart.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

cartRouter.use(verifyJwt);

cartRouter.post("/addToCart", addToCart);
cartRouter.delete("/delete/:id", removeFromCart);
cartRouter.get("/cartItems", getCart);

export default cartRouter;
