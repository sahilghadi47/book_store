import User from "../model/user.model.js";
import { functionHandler } from "../utils/functionHandler.js";
import {
    SuccessResponse as Success,
    CreatedResponse as Created,
} from "../utils/ResponseHandler.js";
import {
    CustomError,
    UnauthorisedError,
    BadRequestError,
    InternalServerError,
    ServiceUnavailableError,
} from "../utils/ErrorHandler.js";
import { cookieOptions } from "../constants.js";
import generateTokens from "../utils/generateTokens.js";

const registerUser = functionHandler(async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            throw new BadRequestError("Please provide all the required fields");

        const exitingUser = await User.findOne({
            $or: [{ email }],
        });
        if (exitingUser) throw new BadRequestError("User already exists");

        const user = await User.create({
            fullName,
            email,
            password,
        });
        if (!user)
            throw new InternalServerError(
                "Something went wrong while registering the user",
            );

        const { accessToken, refreshToken } = await generateTokens(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const response = new Created(
            "User successfully Registered",
            user.toJSON(),
        );
        return res
            .status(response.statusCode)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .cookie("accessToken", accessToken, cookieOptions)
            .json(response);
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new BadRequestError(error.message);
        }

        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

const loginUser = functionHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new BadRequestError("Please provide all the required fields");

        const user = await User.findOne({ email });
        if (!user) throw new UnauthorisedError("Invalid User credentials");

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect)
            throw new UnauthorisedError("Invalid User credentials");

        const { accessToken, refreshToken } = await generateTokens(user);
        const response = new Success(
            "User successfully logged in",
            user.toJSON(),
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .cookie("accessToken", accessToken, cookieOptions)
            .json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

const updateTokens = functionHandler(async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new ServiceUnavailableError("Refresh token expired");

        const user = await User.findOne({ refreshToken });
        if (!user) throw new UnauthorisedError("Please login again");

        const { accessToken, refreshToken: newRefreshToken } =
            await generateTokens(user);
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const response = new Success(
            "User successfully logged in",
            user.toJSON(),
        );

        return res
            .status(200)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .cookie("accessToken", accessToken, cookieOptions)
            .json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

const logoutUser = functionHandler(async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new ServiceUnavailableError("Refresh token expired");

        const user = await User.findOne({ refreshToken });
        if (!user) throw new UnauthorisedError("Please login again");

        const response = new Success("User successfully logged out", null);

        return res
            .status(200)
            .clearCookie("refreshToken", cookieOptions)
            .clearCookie("accessToken", cookieOptions)
            .json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

export { registerUser, loginUser, updateTokens, logoutUser };
