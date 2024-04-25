import express from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from '../../DB/models/userModel.js';
dotenv.config();
const router =express.Router();

const Secret=process.env.SECRET_KEY;

const sendMessageMiddleware=async(req,res,next)=>{
    
  try {
    const token=req.cookies.jwt;
    
    if(!token){
      return  res.status(400).json({
        msg:"token not found"
      });
    }
    
    
    const  decoded=jwt.verify(token,Secret);
    if(!decoded){
      return  res.status(400).json({
        msg:"token not found"
      });
      
    }
    const {userId}=decoded;
    // res.json({
    //   msg:"inside middleware"
    // })
    const user=await User.findById(userId).select("-password");
    //   res.json(user);
    
      if(!user){
        return  res.status(400).json({
          msg:"user not found"
        });
      }
      req.user=user;
      next();

    
  } catch (error) {
     res.status(400).json({
     msg:"error in sendMessageMiddleware"
     });
  }

};



export default sendMessageMiddleware;