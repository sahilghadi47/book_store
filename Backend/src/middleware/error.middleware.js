import { CustomError } from "../utils/ErrorHandler.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message,
            errors: err.error,
        });
    }
    next(err);
};
export default errorHandler;
