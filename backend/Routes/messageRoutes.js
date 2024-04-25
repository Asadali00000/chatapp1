import express from 'express'
import { getMessage, sendMessage } from '../controllers/messageController.js';
import   sendMessageMiddleware  from '../middleware/sendMessageMiddleware.js';

const router=express.Router();
router.post('/send/:id', sendMessageMiddleware,sendMessage);
router.get('/:id', sendMessageMiddleware,getMessage);

export default router;