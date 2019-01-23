import express from 'express';
import { User } from '../models/user';

// Temporary
import { DB } from '../data';

export const userRouter = express.Router();


userRouter.get('', (req, res) => {
    DB.selectAllUsers();
    res.json(DB.selectAllUsers());
});

userRouter.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);
    let user = DB.selectUserById(id);
    res.json(user);
});