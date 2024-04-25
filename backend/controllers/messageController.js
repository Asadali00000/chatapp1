import express from 'express';
import dotenv from 'dotenv'
import Conversation from '../../DB/models/conversationModel.js';
import Message from '../../DB/models/messageModel.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
dotenv.config();
const router = express.Router();
const Secret = process.env.SECRET_KEY;

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, recieverId] }
        });
        if (!conversation) {
            conversation = new Conversation({
                members: [senderId, recieverId]
            });

        }
        const newMessage = new Message({
            senderId,
            recieverId,
             message
        });
        if (newMessage) {
            conversation.message.push(newMessage._id);
        }
        // res.json(newMessage);
        
        
        await Promise.all([conversation.save(), newMessage.save()]);

        
        const recieverSocketId = getReceiverSocketId(recieverId);
		if (recieverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(recieverSocketId).emit("newMessage", newMessage);
		}

        res.status(200).json(
            newMessage
        );


    } catch (error) {
        res.status(400).json({
            message: "error in sendMessage",
            error: error
        });
    }

};

export const getMessage = async (req, res) => {
    try {
        const { id: recipientId } = req.params;
        const userid = req.user._id;
     
        
        const conversation = await Conversation.findOne({
            members: { $all: [userid, recipientId] }
        }).populate("message");
        if (!conversation) return res.status(200).json([]);

		const messages = conversation.message;

		res.status(200).json(messages);
       
    } catch (error) {
        res.status(400).json({
            message: "error in getMessage",
            error: error
        });
    }


}




export default router;
