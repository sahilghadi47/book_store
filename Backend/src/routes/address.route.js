import { Router } from "express";
import {
    addAddress,
    deleteAddress,
    updateAddress,
} from "../controller/address.controller.js";

import { verifyJwt } from "../middleware/auth.middleware.js";

const addressRoute = Router();
addressRoute.use(verifyJwt);

addressRoute.post("/", addAddress);
addressRoute.delete("/:id", deleteAddress);
addressRoute.put("/:id", updateAddress);

export default addressRoute;
