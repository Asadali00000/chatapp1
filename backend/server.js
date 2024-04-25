import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import connectToMondoDB from '../DB/connecttomongodb.js'
import { app, server } from './socket/socket.js'
dotenv.config()

const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/user',userRoutes);
const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT,()=>{
    connectToMondoDB();
});