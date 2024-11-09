import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the CORS package
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import { authenticate } from './middlewares/auth.js';

const app = express();
const port = process.env.PORT || 4000 

// Connect to DB
connectDB();

// Middleware to enable CORS
app.use(cors()); // Allow all domains (for development purposes)

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', authenticate, loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
