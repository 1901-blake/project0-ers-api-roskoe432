import express from 'express';

export const authRouter = express.Router();

function LoginCheck(req, user: string, pw: string): boolean {
    return (req.body.username === user && req.body.password === pw);
}

authRouter.get('/login', (req, res) => {
    if (req.body.username === 'blake' && req.body.password === 'password') {
        const user = {
            username: req.body.username,
            role: 'admin'
        };
        req.session.user = user;
        res.json(user);
    }
});

authRouter.get('/info', (req, res) => {
    res.json(req.session.user);
});