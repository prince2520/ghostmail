exports.errorHandler = (err, req, res, next) => {
    const errorStatus = err?.statusCode || 500;
    const errorMessage = err?.message || "Internal Server Error";

    console.log('err-> ', err)

    return res.status(errorStatus).json({
        success: false,
        message: errorMessage
    });
};
