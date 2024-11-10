import { useState, useEffect } from 'react';
import axios from "axios";

const AdminLoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/loans/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Loans Data:', response.data);
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  const approveLoan = async (loanId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await axios.patch(
        import.meta.env.VITE_BACKEND_URL + `/api/loans/${loanId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoans(loans.map((loan) => loan._id === loanId ? { ...loan, status: 'APPROVED' } : loan));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-blue-700">Loan Requests</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-600">No loan requests available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-sm sm:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-2 border-b">Customer Name</th>
                <th className="px-3 sm:px-4 py-2 border-b">Amount</th>
                <th className="px-3 sm:px-4 py-2 border-b">Term (Weeks)</th>
                <th className="px-3 sm:px-4 py-2 border-b">Status</th>
                <th className="px-3 sm:px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-100">
                  <td className="px-3 sm:px-4 py-3 border-b text-sm sm:text-base">{loan.userId?.username}</td>
                  <td className="px-3 sm:px-4 py-3 border-b text-sm sm:text-base">₹{loan.amount}</td>
                  <td className="px-3 sm:px-4 py-3 border-b text-sm sm:text-base">{loan.term}</td>
                  <td className="px-3 sm:px-4 py-3 border-b">
                    <span
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white ${
                        loan.status === 'PENDING' ? 'bg-yellow-500' :
                        loan.status === 'APPROVED' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 border-b">
                    {loan.status === 'PENDING' ? (
                      <button
                        onClick={() => approveLoan(loan._id)}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-md">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLoanList;
