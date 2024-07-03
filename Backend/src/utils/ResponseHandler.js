class ResponseHandler {
    constructor(statusCode = 200, message = "success", data = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

class SuccessResponse extends ResponseHandler {
    constructor(message, data = {}) {
        super(200, message, data);
    }
}
class CreatedResponse extends ResponseHandler {
    constructor(message, data = {}) {
        super(201, message, data);
    }
}
export { SuccessResponse, CreatedResponse, ResponseHandler };
