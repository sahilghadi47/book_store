import { CustomError } from "../utils/ErrorHandler.js";

const errorHandler = (err, req, res) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message,
            errors: err.error,
        });
    }

    return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Internal Server Error",
    });
};
export default errorHandler;
