import express from 'express'
import sendMessageMiddleware from '../middleware/sendMessageMiddleware.js';
import { getUserForSidebar } from '../controllers/userController.js';
const router=express.Router()


router.get('/:id',sendMessageMiddleware, getUserForSidebar);


export default router;