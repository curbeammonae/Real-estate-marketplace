import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

//connects our server to the database
mongoose
    .connect(process.env.MONGO) //hides our database string in MONGO variable in .env file
    .then(() => {
        console.log('connected to database')//lets us know we are connected to db
    })
    .catch((err) => { //catches error & tells us what it is
        console.log(err)
    })
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('server is running on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal sever erorr';
    return res.status(statusCode).json({
        succes: false,
        statusCode,
        message,

    });
});