import express from 'express';
import { createLoan, approveLoan, addRepayment, getLoans, getAllLoans } from '../controllers/loanController.js';
import { checkAdmin, authenticate } from '../middlewares/auth.js';

const router = express.Router();

// User routes
router.post('/add', authenticate, createLoan); // Only authenticated users can create loans
router.get('/get', authenticate, getLoans); // Only authenticated users can get their loans

// Admin routes
router.get('/all', checkAdmin, getAllLoans); // Admin can view all loans
router.patch('/:id/approve', checkAdmin, approveLoan); // Admin can approve a loan

// Repayment routes
router.post('/:id/repay', authenticate, addRepayment); // Only authenticated users can make repayments

export default router;
