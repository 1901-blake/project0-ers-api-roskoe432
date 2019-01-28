import express from 'express';
import { User } from '../models/user';
import { UserDao } from '../dao/user.dao';

export const userRouter = express.Router();


userRouter.get('', async (req, res) => {
    let users = await UserDao.getAllUsers();
    console.log(users);
    res.json(users);
    //res.end("Getting all users");
});

userRouter.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let user = await UserDao.getUserById(id);
    res.json(user);
});

userRouter.patch('', (req, res) => {
    let id = parseInt(req.body.userId);
    //let user = DB.selectUserById(res, id);
    // Finish check all properties
    
    console.log(id);
    //res.status(200).send(user);
    res.end("User Patch"); // Temp
});