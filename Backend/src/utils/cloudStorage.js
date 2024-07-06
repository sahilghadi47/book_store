import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { InternalServerError } from "./ErrorHandler.js";
dotenv.config({
    path: ".env",
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudUpload = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "bookStore",
        });

        return response;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
};

const cloudDelete = async (public_id) => {
    try {
        const response = await cloudinary.uploader.destroy(public_id);
        return response;
    } catch (error) {
        throw new InternalServerError(error.message);
    }
};

export { cloudUpload, cloudDelete };
