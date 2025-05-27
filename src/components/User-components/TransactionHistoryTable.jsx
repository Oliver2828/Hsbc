import React from "react";

const TransactionHistoryTable = ({
  transactions = [], // Default to an empty array if transactions is undefined
  totalTransactions,
  limit,
  currentPage,
  onPageChange,
  showPagination = true,
}) => {
  console.log("Transactions received in TransactionHistoryTable:", transactions);

  const totalPages = Math.ceil(totalTransactions / limit);

    return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-900">Date</th>
            <th className="px-4 py-3 font-medium text-gray-900">Recipient</th>
            <th className="px-4 py-3 font-medium text-gray-900">Bank</th>
            <th className="px-4 py-3 font-medium text-gray-900">Amount</th>
            <th className="px-4 py-3 font-medium text-gray-900">Currency</th>
            <th className="px-4 py-3 font-medium text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-50 even:bg-gray-50">
              <td className="px-4 py-3">
                  {transaction.transferDate
                    ? (() => {
                        const d = new Date(transaction.transferDate);
                        return isNaN(d) ? "N/A" : d.toLocaleDateString();
                      })()
                    : "N/A"}
                </td>
              <td className="px-4 py-3">{transaction.recipientName}</td>
              <td className="px-4 py-3">{transaction.recipientBank || "N/A"}</td>
              <td className="px-4 py-3">
                <span className={`font-medium ${transaction.amount >= 0 ? "text-red-600" : "text-green-600"}`}>
                  {transaction.amount >= 0 ? "-" : "+"}
                  {(Math.abs(transaction.amount) || 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: transaction.currency || "USD",
                  })}
                </span>
              </td>
              <td className="px-4 py-3">{transaction.currency || "USD"}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <nav className="flex isolate divide-x divide-gray-300 rounded-lg shadow-sm">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <div className="flex divide-x divide-gray-300">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => onPageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white focus:z-20"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryTable;