import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log("Server started at PORT:" + PORT);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
