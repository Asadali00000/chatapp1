import express from 'express'
import User from '../../DB/models/userModel.js';
const router =express.Router();

export const getUserForSidebar=async(req,res)=>{
   
   try {
    
       const   {id:loggedUserid} =req.params;
       const allSidebarUsers=await User.find({_id:{$ne:loggedUserid}}).select("-password");
       res.status(200).json(allSidebarUsers);
    } catch (error) {
     res.json({
        msg:"error in getUserForSidebar"
     })
    }
}

export default getUserForSidebar;