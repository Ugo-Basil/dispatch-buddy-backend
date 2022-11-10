import express, { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import cors from 'cors';
import indexRouter from './routes/index';
import pickupUserRouter from './routes/pickupUserRoute';
import riderRouter from './routes/riderRoute';

const port = process.env.PORT || 4000;

const app: Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', pickupUserRouter);
app.use('/user', riderRouter);

db.sync().then(() => {
    console.log('Database connected successfully');

})
.catch ((err) => {
    console.log('Error connecting to database');
   
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});