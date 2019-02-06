import express from 'express';
import { UserDao } from '../dao/user.dao';



export const authRouter = express.Router();


// Request to login to api.
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
        res.status(200).json({msg: "Login Successful", ...u});
    }
    else {
        res.status(400).json({
            message: "Invalid Credentials"
        });
    }
});


// Request to logout the session user.
authRouter.post('/logout', async (req, res) => {
    if(req.session.user) {
        let temp = req.session.user;
        req.session.user = null;
        res.status(201).json({ msg: "User has logged out!", ...temp});
    } else {
        res.sendStatus(400);
    }
});