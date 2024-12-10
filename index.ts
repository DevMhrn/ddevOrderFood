import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dbConfig = require('./config/db');


import { AdminRouter, VendorRoute } from './routes';

const  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // not clear need to check again here
 

const PORT = process.env.PORT || 3000;

app.use('/admin', AdminRouter);
app.use('/vendor', VendorRoute);

app.use('/', (req, res) => {
    res.json('Hello, Fastddev Food!');
});
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT} on "http://localhost:${PORT}" `);
    console.log(`Server is running on port ${PORT}`);
});






