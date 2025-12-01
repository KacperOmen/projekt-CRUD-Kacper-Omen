import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();

export const userAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({success: false, message: 'Not Authorized'})
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = tokenDecoded;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: error.message});
    }
}