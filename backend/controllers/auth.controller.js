import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {login, email, password, role} = req.body;

        if (!login || !email || !password || !role) {
            return res.status(400).json({success: false, message: "Missing details"});
        }

        const existingUser = await User.findOne({login});

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({login, email, password: hashedPassword, role});
           
            return res.status(200).json({success: true, user});
        }

        return res.status(409).json({success: false, message: "User already exists"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}