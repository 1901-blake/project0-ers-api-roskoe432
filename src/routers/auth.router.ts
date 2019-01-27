import express from 'express';

export const authRouter = express.Router();

function LoginCheck(req, user: string, pw: string): boolean {
    return (req.body.username === user && req.body.password === pw);
}

authRouter.get('/login', (req, res) => {
    
});

authRouter.get('/info', (req, res) => {
    res.json(req.session.user);
});