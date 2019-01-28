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

userRouter.patch('', async (req, res) => {
    let id = parseInt(req.body.userid);
    // console.log(id);
    let user = await UserDao.updateUser(req, id);    
    res.status(201).send(user);
    // res.end(`Updating User: ${id}`);
});

/* 
    {
        "userid": 5;
        "username": "Moe";
        "password": "newpassword";
        "firstname": "Moe";
        "lastname": "Howard";
        "email": "moe@gmail.com";
        "role": {
            "roleid": 3,
            "role": "associate"
        };
    }
*/