import { Router } from "express";
import {
    registerUser,
    loginUser,
    updateTokens,
    logoutUser,
} from "../controller/auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);

authRoute.patch("/refresh-tokens", verifyJwt, updateTokens);
authRoute.get("/logout", verifyJwt, logoutUser);

export default authRoute;
