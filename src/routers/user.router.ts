import express from 'express';
import { UserDao } from '../dao/user.dao';

export const userRouter = express.Router();

userRouter.get('', async (req, res) => {
    let users = await UserDao.getAll();
    if(users) {
        res.json(users);
    } else {
        res.status(401).send('Could not retrieve users.');
    }
    // res.end('Testing');
});

userRouter.get('/:id', async (req, res) => {
    let user = await UserDao.getById(req.params.id);
    if(user) {
        res.json(user);
    } else {
        res.status(401).send('User not found!');
    }
    // res.end('Testing');
});

userRouter.patch('', async (req, res) => {
    let user = await UserDao.update(req);
    console.log(user);
    if(user) {
        res.status(201).send(user);
    } else {
        res.status(401).send('User not updated!');
    }
    // res.end('Testing');
});