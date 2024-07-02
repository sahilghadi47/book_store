import { CustomError } from "../utils/ErrorHandler.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err.error,
            stack: err.stack,
        });
    }
};
export default errorHandler;
