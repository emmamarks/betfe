const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, res) =>{
    let error = {...err};
    error.message = err.message

    if(err.code ===11000){
        const message = `Duplicate Field value Entered`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "Validation Error"){
        const message = Object.values(err.errors).map((val) => val.message);
    }

    error = new ErrorResponse(error.message, 400);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;