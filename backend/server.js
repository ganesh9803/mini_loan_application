import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import { authenticate } from './middlewares/auth.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', authenticate, loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Export the app to work with serverless functions on Vercel
export default app;
