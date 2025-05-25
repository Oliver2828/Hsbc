import React, { useState, useEffect } from "react";

// Mock data
const mockTransactions = [
  {
    id: 1,
    date: "2025-05-01",
    amount: "$120.00",
    type: "Credit",
    description: "Salary Payment",
  },
  {
    id: 2,
    date: "2025-05-03",
    amount: "$45.00",
    type: "Debit",
    description: "Grocery Shopping",
  },
  {
    id: 3,
    date: "2025-05-05",
    amount: "$75.00",
    type: "Credit",
    description: "Freelance Work",
  },
  {
    id: 4,
    date: "2025-05-07",
    amount: "$30.00",
    type: "Debit",
    description: "Fuel",
  },
  {
    id: 5,
    date: "2025-05-10",
    amount: "$200.00",
    type: "Credit",
    description: "Project Bonus",
  },
  {
    id: 6,
    date: "2025-05-12",
    amount: "$60.00",
    type: "Debit",
    description: "Restaurant",
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Transaction History</h2>

      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <p className="text-gray-600">
          View and manage all your transactions in one place. Use the search bar to find specific transactions.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 15z" />
            </svg>
          </span>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search transactions"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.amount}</td>
                <td className="p-3">{t.type}</td>
                <td className="p-3">{t.description}</td>
              </tr>
            ))}
            {currentTransactions.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      {/* bb */}
    </div>
  );
};

export default Transactions;
