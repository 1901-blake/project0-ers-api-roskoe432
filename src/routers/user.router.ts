import express from 'express';
import { UserDao } from '../dao/user.dao';

export const userRouter = express.Router();

userRouter.get('', async (req, res) => {
    let users = await UserDao.getAllUsers();
    console.log(users);
    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let user = await UserDao.getUserById(id);
    res.json(user);
});

userRouter.patch('', async (req, res) => {
    let id = parseInt(req.body.userid);
    let user = await UserDao.updateUser(req, id);    
    res.status(201).send(user);
});