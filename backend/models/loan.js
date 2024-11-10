import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  repayments: [{
    dueDate: { type: Date },
    amount: { type: Number },
    status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
  }],
});

const Loan = mongoose.models.Loan || mongoose.model('Loan', loanSchema);
export default Loan;
