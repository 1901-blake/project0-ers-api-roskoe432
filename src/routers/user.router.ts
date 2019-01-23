import express from 'express';
import { User } from '../models/user';

// Temporary
import { DB } from '../data';

const userRouter = express.Router();


userRouter.get('', (req, res) => {
    DB.selectAllUsers();
});