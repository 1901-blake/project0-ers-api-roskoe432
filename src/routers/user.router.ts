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
    let user = DB.selectUserById(res, id);
    res.json(user);
});

userRouter.patch('', (req, res) => {
    let id = parseInt(req.body.userId);
    let user = DB.selectUserById(res, id);
    // Finish check all properties

    for(let prop in user) {
        if(req.body[prop]) {
            user[prop] = req.body[prop];
        }
    }
    
    console.log(id);
    res.status(200).send(user);
});