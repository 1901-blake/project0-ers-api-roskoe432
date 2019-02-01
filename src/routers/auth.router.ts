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
        res.json(user);
    }
    else {
        res.status(400).json({
            message: "Invalid Credentials"
        });
    }
});



authRouter.post('/logout', async (req, res) => {
    if(req.session.user) {
        let u = req.session.user;
        req.session.user = null;
        res.status(201).json(u);
    } else {
        res.sendStatus(400);
    }
});



authRouter.get('/info', (req, res) => {
    if(req.session.user) {
        res.status(201).json(req.session.user);
    } else {
        res.status(400).send('No User Logged In.');
    }
});