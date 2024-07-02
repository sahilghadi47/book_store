class ResponseHandler {
    constructor(statusCode = 200, message = "success", data = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}
export default ResponseHandler;
