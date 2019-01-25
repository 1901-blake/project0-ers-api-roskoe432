import express from 'express';
// import session from 'express-session';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.router';
import { reimburseRouter } from './routers/reimbursement.router';
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`request was made with url: ${req.path} and method: ${req.method}`);
    next(); // will pass the request on to search for the next piece of middleware
});

// login/auth router
app.use('/users', userRouter);
app.use('/reimburse', reimburseRouter);

app.listen(3000);