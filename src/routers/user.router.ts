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
    let b = req.body;
    if (b.username) user.username = b.username;
    if (b.password) user.password = b.password;
    if (b.firstName) user.firstName = b.firstName;
    if(b.lastName) user.lastName = b.lastName;
    if(b.email) user.email = b.email;
    if(b.role) user.role = b.role;
    
    console.log(id);
    res.status(200).send(user);
});