import express from 'express';
import {clerkWebhook}from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook);
userRouter.get('/test',(req,res)=>{res.send("HEllo webhook")});

export default userRouter;