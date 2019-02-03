import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.router';
import { reimburseRouter } from './routers/rem.router'
import { authRouter } from './routers/auth.router';

const app = express();
const sess = {
    secret: 'potato',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
};

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`request was made with url: ${req.path} and method: ${req.method}`);
    next(); // will pass the request on to search for the next piece of middleware
});

app.use(session(sess));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimburseRouter);

app.listen(3000);

console.log('Server has started on port: 3000');