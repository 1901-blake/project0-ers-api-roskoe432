import express from 'express';
import { UserDao } from '../dao/user.dao';



export const authRouter = express.Router();



authRouter.post('/login', async (req, res) => {
    let user = await UserDao.getByLogin(req);
    if(user) {
        let u = {
            id: user.userId,
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            role: user.role.role
        };
        req.session.user = u;
        res.status(200).json(user);
    }
    else {
        res.status(400).json({
            message: "Invalid Credentials"
        });
    }
});



authRouter.post('/logout', async (req, res) => {
    if(req.session.user) {
        req.session.user = null;
        res.status(201).send('User has logged out');
    } else {
        res.sendStatus(400);
    }
});