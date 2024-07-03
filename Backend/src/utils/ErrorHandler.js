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

class ForbiddenError extends CustomError {
    constructor(message, error = []) {
        super(403, message, error);
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

export {
    CustomError,
    UnauthorisedError,
    ForbiddenError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
    ServiceUnavailableError,
};
