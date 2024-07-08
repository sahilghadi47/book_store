/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import {
    CustomError,
    NotFoundError,
    UnauthorisedError,
    ForbiddenError,
} from "../utils/ErrorHandler.js";

const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            throw new CustomError(
                403,
                "Access token not found :: Access denied",
            );
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) throw new UnauthorisedError(401, "Invalid access token");

        const user = await User.findById(decoded?._id).select("-password");

        if (!user) {
            throw new NotFoundError(404, "User not fonund");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const hasRole = (role) => {
    return (req, res, next) => {
        try {
            if (req?.user.role !== role) {
                throw new ForbiddenError("Access control denied");
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export { verifyJwt, hasRole };
