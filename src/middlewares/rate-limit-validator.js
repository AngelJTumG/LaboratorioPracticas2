import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

export default apiLimiter;