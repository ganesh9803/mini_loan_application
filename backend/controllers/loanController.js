import Loan from '../models/loan.js';

export const createLoan = async (req, res) => {
  const { amount, term } = req.body;
  const repayments = [];
  const weeklyAmount = amount / term;

  const today = new Date();
  for (let i = 1; i <= term; i++) {
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + i * 7);
    repayments.push({
      dueDate,
      amount: i === term ? weeklyAmount + (amount % term) : weeklyAmount,
      status: 'PENDING',
    });
  }

  try {
    const newLoan = new Loan({
      userId: req.userId,
      amount,
      term,
      repayments,
      status: 'PENDING',
    });
    await newLoan.save();
    res.status(201).json({ message: 'Loan created successfully', loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};

// Get all loans (Admin only)
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'username email');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};

// Approve a pending loan (Admin only)
export const approveLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findById(id);
    if (loan.status !== 'PENDING') {
      return res.status(400).json({ message: 'Loan is not pending' });
    }

    loan.status = 'APPROVED';
    await loan.save();
    res.json({ message: 'Loan approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving loan', error: error.message });
  }
};

export const addRepayment = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const loan = await Loan.findById(id);
    if (loan.status !== 'APPROVED') {
      return res.status(400).json({ message: 'Loan must be approved before making repayments' });
    }

    const pendingRepayment = loan.repayments.find(r => r.status === 'PENDING');
    if (!pendingRepayment || amount < pendingRepayment.amount) {
      return res.status(400).json({ message: 'Invalid repayment amount' });
    }

    pendingRepayment.status = 'PAID';
    await loan.save();

    if (loan.repayments.every(r => r.status === 'PAID')) {
      loan.status = 'PAID';
      await loan.save();
    }

    res.json({ message: 'Repayment successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing repayment', error: error.message });
  }
};

// Get loans of a specific user (Customer only)
export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.userId }); // Fetch loans associated with the authenticated user
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};
