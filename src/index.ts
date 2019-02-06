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

// Parses data into readable json object
app.use(bodyParser.json());
// Session middleware
app.use(session(sess));

app.use( async (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
    //res.header('Access-Control-Allow-Origin', String(req.headers.origin));
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimburseRouter);

app.listen(3000);

console.log('Server has started on port: 3000');