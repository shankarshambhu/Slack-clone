import express from 'express';
import { getStreamToken } from '../controllers/chat.controller';
import { protectRoute } from '../middleware/auth.middleware';

const chatRouter = express.Router();

chatRouter.get('/token', protectRoute,getStreamToken);


export default chatRouter;
