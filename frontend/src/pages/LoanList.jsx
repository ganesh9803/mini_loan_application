import { useEffect, useState } from 'react';
import axios from "axios";
import RepaymentForm from '../components/RepaymentForm';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const loansPerPage = 5; // Loans per page

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) throw new Error('No token found');
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/loans/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (error) {
      setMessage(`Error fetching loans: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoanDetails = (loanId) => {
    setSelectedLoanId((prevLoanId) => (prevLoanId === loanId ? null : loanId));
  };

  // Pagination: Slice loans array based on current page
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(loans.length / loansPerPage);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Loan Applications</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : message ? (
        <p className="text-red-500 text-center">{message}</p>
      ) : (
        <div>
          {loans.length === 0 ? (
            <p className="text-center">No loan applications found.</p>
          ) : (
            <div>
              {currentLoans.map((loan) => (
                <div key={loan._id} className="mb-6 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div onClick={() => toggleLoanDetails(loan._id)} className="cursor-pointer mb-4">
                    <h3 className="text-xl font-semibold">Loan Amount: ₹{loan.amount}</h3>
                    <p>Term: {loan.term} weeks</p>
                    <p>Status: {loan.status}</p>
                  </div>
                  
                  {selectedLoanId === loan._id && (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold mb-2">Repayment Schedule</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto mt-4">
                          <thead>
                            <tr className="border-b text-center">
                              <th className="px-4 py-2">Due Date</th>
                              <th className="px-4 py-2">Amount</th>
                              <th className="px-4 py-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loan.repayments.map((repayment, index) => (
                              <tr key={index} className="border-b text-center">
                                <td className="px-4 py-2">{new Date(repayment.dueDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">₹{repayment.amount}</td>
                                <td className="px-4 py-2">{repayment.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <RepaymentForm
                        loanId={loan._id}
                        repayments={loan.repayments}
                        onRepaymentSuccess={fetchLoans} // Refresh loans on repayment success
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanList;
