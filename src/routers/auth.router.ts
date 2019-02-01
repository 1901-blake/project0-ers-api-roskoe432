import express from 'express';
import { UserDao } from '../dao/user.dao';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    let user = await UserDao.getByLogin(req);
    if(user) {
        let u = {
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            role: user.role.role
        };
        console.log(u);
        req.session.user = u;
        res.json(u);
    }
    else {
        res.status(400).send('BAD REQUEST');
    }
});

authRouter.get('/info', (req, res) => {
    if(req.session.user) {
        res.status(201).json(req.session.user);
    } else {
        res.status(400).send('No User Logged In.');
    }
});