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
const updatePassword = functionHandler(async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
            throw new BadRequestError("Please provide all the required fields");

        const user = await User.findById(req.user._id);
        if (!user) throw new UnauthorisedError("User not found");

        const isPasswordCorrect = await user.comparePassword(oldPassword);
        if (!isPasswordCorrect)
            throw new UnauthorisedError("Invalid User credentials");

        user.password = newPassword;
        await user.save();

        const response = new Success(
            "Password successfully updated",
            user.toJSON(),
        );

        return res.status(200).json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

const updateUserRole = functionHandler(async (req, res) => {
    try {
        const userid = req.user?._id;
        if (!userid) throw new UnauthorisedError("User not found");

        const { role } = req.body;
        if (!role)
            throw new BadRequestError("Please provide all the required fields");

        const user = await User.findById(req.user._id);
        if (!user) throw new UnauthorisedError("User not found");

        user.role = role;
        await user.save();

        const response = new Success(
            "Role successfully updated",
            user.toJSON(),
        );

        return res.status(200).json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});

const getAllUsers = functionHandler(async (req, res) => {
    try {
        const userid = req.user?._id;
        const user = await User.findById(userid);
        if (!user) throw new UnauthorisedError("User not found");
        if (user.role !== "admin")
            throw new UnauthorisedError("You are not authorized");

        const users = await User.find();
        const response = new Success("Users fetched successfully", users);

        return res.status(200).json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});
const deleteUser = functionHandler(async (req, res) => {
    try {
        const admin = req.user;
        if (!admin) throw new UnauthorisedError("User not found");

        if (admin.role !== "admin")
            throw new UnauthorisedError("You are not authorized");
        const { id } = req.params;

        if (!id) throw new BadRequestError("Please provide user id");

        const user = await User.findByIdAndDelete(id);
        const response = new Success("Users fetched successfully", user);

        return res.status(200).json(response);
    } catch (error) {
        throw new CustomError(error.status, error.message, error, error?.stack);
    }
});
export {
    registerUser,
    loginUser,
    updateTokens,
    logoutUser,
    updatePassword,
    updateUserRole,
    getAllUsers,
    deleteUser,
};
