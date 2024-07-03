import { isValidObjectId } from "mongoose";
import {
    CustomError,
    NotFoundError,
    InternalServerError,
    ServiceUnavailableError,
} from "../utils/ErrorHandler.js";

const generateTokens = async (user) => {
    try {
        if (!user) throw new NotFoundError("User not found");

        if (!isValidObjectId(user._id)) {
            throw new ServiceUnavailableError("Invalid User Id");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        if (!accessToken || !refreshToken) {
            throw new InternalServerError(
                "Something went wrong while generating tokens",
            );
        }
        return { accessToken, refreshToken };
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
};

export default generateTokens;
