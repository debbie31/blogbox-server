import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import user from './routes/UserRoutes.js';
import post from './routes/PostRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI);


mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
});

app.use('/users', user);
app.use('/posts', post);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
