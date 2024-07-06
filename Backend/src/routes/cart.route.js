import { Router } from "express";
const cartRouter = Router();
import {
    addToCart,
    removeFromCart,
    getCartItems,
} from "../controller/cart.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

cartRouter.use(verifyJwt);

cartRouter.post("/addToCart", addToCart);
cartRouter.delete("/delete/:id", removeFromCart);
cartRouter.get("/cartItems", getCartItems);

export default cartRouter;
