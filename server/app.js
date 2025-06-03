import express from 'express';
import userRouter from './routes/user.router.js'
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import morgan from 'morgan';
import {cors} from 'cors';
import morgan from 'morgan';
config();
connectDB();
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
app.use('/users',userRouter);
app.put