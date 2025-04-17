import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';

dotenv.config();

const app = express();

// Clerk webhook raw body (must come before express.json)
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }));

// Connect MongoDB
(async () => {
  await connectDB();
})();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
  await connectDB();
  res.send("API working");
});

app.use('/api/user', userRouter);


// app.listen(PORT, () => {
//   console.log(`App running at PORT no. ${PORT}`);
// });

export default app;
