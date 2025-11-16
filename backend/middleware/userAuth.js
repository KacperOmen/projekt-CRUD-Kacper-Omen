import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({success: false, message: 'Not Authorized'})
    }

    try {
        const tokenDecoded = jwt.verify(token, "secret")
        req.user = tokenDecoded;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: error.message});
    }
}