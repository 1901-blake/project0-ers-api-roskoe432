import express from 'express';
// import session from 'express-session';
import bodyParser from 'body-parser';
// Routers
import { userRouter } from './routers/user.router';
const app = express();



app.use(bodyParser.json());

// login/auth router
app.use('/users', userRouter);

app.listen(3000);