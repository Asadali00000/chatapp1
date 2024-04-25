import express from 'express';
import dotenv from 'dotenv'
import User from '../../DB/models/userModel.js';
import generateTokenSetCookie from '../utils/genrateToken.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
dotenv.config();
const router = express.Router();
export const signup = async (req, res) => {
    try {

        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });

        }

        const user = await User.findOne({ username });

        
        if (user) {

            return res.status(400).json(
                {
                    message: "Username already exists",
                },
            );
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        await newUser.save();
        generateTokenSetCookie(newUser._id,res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        });


    } catch (error) {
        res.status(500).json({
            message: "error while Creating User",
        });


    }
};



export const login = async (req, res) => {
    try {
        
        const username=req.body.username;
        const password=req.body.password;
        const user=await User.findOne({
            username
        });
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({
                error:"Invalid Credentials",
                password
            });
        }
        generateTokenSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        res.status(404).json({
            error:"internal server error"
        });
        
    }
    
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt',"",{maxAge:0})
        res.status(200).json({
            message:"logged out"
        })

        
    } catch (error) {
        res.status(404).json({
            error:"internal server error"
        });
        
    }   


};

export default router;
