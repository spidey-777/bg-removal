import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express(); // ✅ Define app first

// 👇 Middleware for Clerk webhook (must come before express.json())
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }));

// Connect MongoDB
(async () => {
  await connectDB();
})();

// Other middleware
app.use(express.json()); // for regular routes
app.use(cors());

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/user', userRouter);


app.listen(PORT, () => {
  console.log(`App running at PORT no. ${PORT}`);
});
