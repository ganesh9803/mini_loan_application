import { useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

const RepaymentForm = ({ loanId, repayments, onRepaymentSuccess }) => {
  const [amount, setAmount] = useState(''); // Default to empty string, not 0
  const [message, setMessage] = useState('');

  // Check if all repayments are paid
  const allDuesPaid = repayments.every((repayment) => repayment.status === 'PAID');

  const handleRepayment = async () => {
    // Validate that the amount is a valid positive number
    if (!amount || isNaN(amount) || amount <= 0) {
      return setMessage('Please enter a valid repayment amount greater than zero.');
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) throw new Error('No token found');
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/loans/${loanId}/repay`, { amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
      setAmount(''); // Reset amount after successful repayment
      onRepaymentSuccess && onRepaymentSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error making repayment');
    }
  };

  return (
    <div className="repayment-form mt-6 md:mt-8">
      {allDuesPaid ? (
        <p className="text-green-500 text-center text-lg font-semibold">All dues paid.</p>
      ) : (
        <>
          <div className="input-container mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter repayment amount"
              className="border p-3 w-full md:w-1/2 mx-auto mt-2 rounded-lg text-center md:text-left"
              min="0.01" // Set a minimum value of 0.01 (positive amount)
              step="any" // Allow decimals for repayment amounts
            />
          </div>
          <div className="button-container mt-4 text-center">
            <button
              onClick={handleRepayment}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Make Repayment
            </button>
          </div>
        </>
      )}
      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
  );
};

RepaymentForm.propTypes = {
  loanId: PropTypes.string.isRequired,
  repayments: PropTypes.arrayOf(
    PropTypes.shape({
      dueDate: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRepaymentSuccess: PropTypes.func,
};

export default RepaymentForm;
