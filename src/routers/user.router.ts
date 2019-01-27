import express from 'express';
import { User } from '../models/user';

export const userRouter = express.Router();


userRouter.get('', (req, res) => {
    //res.json(DB.selectAllUsers());
    res.end('Get All Users'); // Temp
});

userRouter.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    //let user = DB.selectUserById(res, id);
    //res.json(user);
    res.end('User Select By Id');
});

userRouter.patch('', (req, res) => {
    let id = parseInt(req.body.userId);
    //let user = DB.selectUserById(res, id);
    // Finish check all properties
    
    console.log(id);
    //res.status(200).send(user);
    res.end("User Patch"); // Temp
});