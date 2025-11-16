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

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({success: false, message: "Email and password are required"});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({success: false, message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({success: false, message: "Invalid email or password"});
        }

        const token = jwt.sign({id: user._id}, "secret", {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, user});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, message: "Logged Out"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getMe = (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};