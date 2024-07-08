class ResponseHandler {
    constructor(statusCode = 200, message = "success", payload = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.payload = payload;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

class SuccessResponse extends ResponseHandler {
    constructor(message, payload = {}) {
        super(200, message, payload);
    }
}
class CreatedResponse extends ResponseHandler {
    constructor(message, payload = {}) {
        super(201, message, payload);
    }
}
export { SuccessResponse, CreatedResponse, ResponseHandler };
