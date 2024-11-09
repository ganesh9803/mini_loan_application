import express from 'express';
import { signup, login, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Add a new route to get the profile
router.get('/profile', authenticate, getProfile); // Authenticated users can access their profile

export default router;
