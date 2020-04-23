import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import { configurePassport } from './utils/passport'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
var sess = {
    secret: 'keyboard cat',
    cookie: {}
}
configurePassport();
const app = express();

app.use(session(sess))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
