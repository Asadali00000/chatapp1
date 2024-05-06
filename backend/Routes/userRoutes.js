import express from 'express'
import sendMessageMiddleware from '../middleware/sendMessageMiddleware.js';
import { getUserForSidebar, searchFriend } from '../controllers/userController.js';
const router=express.Router()


router.get('/:id',sendMessageMiddleware, getUserForSidebar);
router.get('/searchFriend/:id',sendMessageMiddleware,searchFriend);


export default router;