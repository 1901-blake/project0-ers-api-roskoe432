import express, { NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

