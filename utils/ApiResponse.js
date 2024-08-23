class ApiResponse {
    constructor(statusCode, data, messsge = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.messsge = messsge;
        this.seccuss = statusCode < 400;
    }
}

export default ApiResponse;