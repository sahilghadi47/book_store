/* eslint-disable no-undef */
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            validate: {
                validator: function (v) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        v,
                    );
                },
                message: "Please enter a valid email",
            },
        },
        fullName: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        v,
                    );
                },
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        refreshToken: {
            type: String,
            default: null,
        },
        address: {
            type: mongoose.Schema.ObjectId,
            ref: "Address",
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.refreshToken;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    return userObject;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);

export default User;
