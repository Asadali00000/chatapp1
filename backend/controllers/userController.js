import express from 'express'
import User from '../../DB/models/userModel.js';
import Conversation from '../../DB/models/conversationModel.js';

const router = express.Router();

export const getUserForSidebar = async (req, res) => {
   try {
      const { id: loggedUserId } = req.params;

      // Find friends based on conversations
      const friends = await getFriends(loggedUserId);

      // Find users who are friends (excluding the logged-in user) and select fields to display in the sidebar
      const allSidebarUsers = await User.find({ _id: { $in: friends } }).select("-password");

      res.status(200).json(allSidebarUsers);
   } catch (error) {
      console.error(error);
      res.json({
         msg: "Error in getUserForSidebar"
      });
   }
}

const getFriends = async (userId) => {
   try {
      const conversations = await Conversation.find({ members: userId });

      const friendIds = conversations.reduce((ids, conversation) => {
         conversation.members.forEach(memberId => {
            if (memberId.toString() !== userId.toString() && !ids.includes(memberId.toString())) {
               ids.push(memberId.toString());
            }
         });
         return ids;
      }, []);

      return friendIds;
   } catch (error) {
      console.error(error);
      res.json({
         msg: "Error finding friends"
      });
   }
}


export const searchFriend = async (req, res) => {
   try {

      const userName = req.params.id;

      const users = await User.find({ username: { $regex: new RegExp(userName, "i") } }).limit(5);

      res.json(users);

  
   } catch (error) {
      console.error(error);
      res.json({
         msg: "Error in searching friends"
      });
   }
}

export default getUserForSidebar;
