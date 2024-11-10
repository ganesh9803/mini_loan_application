import { useState, useEffect, useCallback } from 'react';
import axios from "axios";

const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  const calculateDueDates = useCallback(
    (term) => {
      const today = new Date();
      const schedule = [];
      for (let i = 1; i <= term; i++) {
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + i * 7);
        schedule.push({ dueDate: dueDate.toLocaleDateString(), amount: (amount / term).toFixed(2) });
      }
      return schedule;
    },
    [amount]
  );

  useEffect(() => {
    if (amount && term) {
      setRepaymentSchedule(calculateDueDates(term));
    } else {
      setRepaymentSchedule([]);
    }
  }, [amount, term, calculateDueDates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) throw new Error('No token found')
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/loans/add', { amount, term }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
      setAmount('');
      setTerm('');
      setRepaymentSchedule([]);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error occurred while submitting the loan request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md my-10 sm:my-20 sm:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 lg:text-left">Apply for a Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount Required (₹)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter loan amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 p-2 w-full mt-1 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="term" className="block text-sm font-medium text-gray-700">
            Loan Term (weeks)
          </label>
          <input
            type="number"
            id="term"
            name="term"
            placeholder="Enter loan term in weeks"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border border-gray-300 p-2 w-full mt-1 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {repaymentSchedule.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Repayment Schedule</h4>
            <ul className="space-y-1">
              {repaymentSchedule.map((repayment, index) => (
                <li key={index} className="text-sm">
                  {`Due Date: ${repayment.dueDate}, Amount: ₹${repayment.amount}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 mt-4 rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold transition duration-200 ease-in-out`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Loan Request'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith('Error') ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoanForm;
