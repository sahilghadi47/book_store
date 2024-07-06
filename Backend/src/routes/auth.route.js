import { Router } from "express";
import {
    registerUser,
    loginUser,
    updateTokens,
    logoutUser,
    updatePassword,
    updateUserRole,
    getAllUsers,
    deleteUser,
} from "../controller/auth.controller.js";
import { hasRole, verifyJwt } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);

authRoute.patch("/refresh-tokens", verifyJwt, updateTokens);
authRoute.get("/logout", verifyJwt, logoutUser);

authRoute.patch("/update-password", verifyJwt, updatePassword);

authRoute.patch("/update-role", verifyJwt, hasRole("admin"), updateUserRole);
authRoute.get("/users", verifyJwt, hasRole("admin"), getAllUsers);
authRoute.delete("/users/:id", verifyJwt, hasRole("admin"), deleteUser);
export default authRoute;
