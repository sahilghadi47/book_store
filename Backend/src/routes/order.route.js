import { Router } from "express";
import { hasRole, verifyJwt } from "../middleware/auth.middleware.js";
import {
    getUserOrders,
    deleteOrder,
    updateOrderStatus,
    createOrder,
    getOrderbyId,
} from "../controller/order.controller.js";

const orderRouter = Router();
orderRouter.use(verifyJwt);

orderRouter.post("/add-order", createOrder);
orderRouter.get("/orders", getUserOrders);
orderRouter.get("/order/:id", getOrderbyId);
orderRouter.patch("/order/:id", hasRole("admin"), updateOrderStatus);
orderRouter.delete("/order/:id", deleteOrder);

export default orderRouter;
