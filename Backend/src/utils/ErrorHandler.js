class CustomError extends Error {
    constructor(statusCode, message, error = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        if (stack) this.stack = stack;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UnauthorisedError extends CustomError {
    constructor(message, error = []) {
        super(401, message, error);
    }
}

class NotFoundError extends CustomError {
    constructor(message, error = []) {
        super(404, message, error);
    }
}
class BadRequestError extends CustomError {
    constructor(message, error = []) {
        super(400, message, error);
    }
}

class InternalServerError extends CustomError {
    constructor(message, error = []) {
        super(500, message, error);
    }
}
class ServiceUnavailableError extends CustomError {
    constructor(message, error = []) {
        super(503, message, error);
    }
}

const CustomError = (err, req, res, next) => {
    console.log(err, req);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            error: err.error,
            stack: err.stack,
        });
    }

    return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message,
        stack: err.stack,
    });
};

export {
    CustomError,
    UnauthorisedError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
    ServiceUnavailableError,
    errorHandler,
};
