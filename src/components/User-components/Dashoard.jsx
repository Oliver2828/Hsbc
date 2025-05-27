import React, { useState, useEffect } from "react";
import { FaExchangeAlt, FaFileInvoice, FaMobileAlt, FaChartLine, FaUserCircle, FaMoneyCheckAlt, FaGlobeAmericas } from "react-icons/fa";
import { FiSend, FiDownload, FiEye, FiSearch } from "react-icons/fi";

const mockAccounts = [
  { id: 1, number: "456*******", type: "Savings", balance: 45500.75 },
  { id: 2, number: "987*******", type: "Checking", balance: 7500.0 },
];

const mockTransactions = [
  { id: 1, recipientName: "Jane Smith", recipientBank: "Chase", currency: "USD", amount: 300.0, date: "2025-05-01" },
  { id: 2, recipientName: "Amazon", recipientBank: "PayPal", currency: "USD", amount: 120.99, date: "2025-05-02" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filteredTx, setFilteredTx] = useState(mockTransactions);

  useEffect(() => {
    setFilteredTx(
      mockTransactions.filter((t) =>
        [t.recipientName, t.recipientBank, t.currency].join(" ").toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const totalBalance = mockAccounts.reduce((sum, a) => sum + a.balance, 0);

  const QuickActionButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md border border-gray-200 w-24 h-24 sm:w-28 sm:h-28 p-4 hover:shadow-lg transition"
      aria-label={label}
      type="button"
    >
      <div className="text-blue-600 text-3xl mb-2">{icon}</div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Good morning, Alyssa Alluraye</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your money today</p>
        </div>
        <button
          className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 transition"
          aria-label="Profile"
        >
          <FaUserCircle className="text-3xl" />
        </button>
      </header>

      {/* Account Overview */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>
          <p className="text-2xl font-semibold text-blue-600">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockAccounts.map(({ id, number, type, balance }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{type}</h3>
                <p className="text-gray-400 text-sm mb-3">{number}</p>
              </div>
              <div className="mb-4">
                <p className="text-blue-600 text-xl font-bold">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-blue-600 text-sm font-medium">
                <button className="flex items-center gap-1 hover:underline" type="button" aria-label="Transfer">
                  <FiSend /> Transfer
                </button>
                <button className="flex items-center gap-1 hover:underline" type="button" aria-label="Deposit">
                  <FiDownload /> Deposit
                </button>
                <button className="flex items-center gap-1 hover:underline" type="button" aria-label="Details">
                  <FiEye /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          <QuickActionButton icon={<FaExchangeAlt />} label="Send Money" onClick={() => alert("Send Money clicked")} />
          <QuickActionButton icon={<FaFileInvoice />} label="Pay Bills" onClick={() => alert("Pay Bills clicked")} />
          <QuickActionButton icon={<FaMobileAlt />} label="E-Statement" onClick={() => alert("E-Statement clicked")} />
          <QuickActionButton icon={<FaChartLine />} label="Invest" onClick={() => alert("Invest clicked")} />
        </div>
      </section>

      {/* Transactions Search */}
      <section className="mb-6 max-w-lg mx-auto">
        <div className="relative text-gray-600">
          <input
            type="search"
            placeholder="Search transactions..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search transactions"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* Transaction History Table */}
      <section className="overflow-x-auto rounded-xl shadow bg-white p-4 max-w-full">
        <table className="min-w-[600px] w-full text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-gray-700 font-semibold">Recipient</th>
              <th className="py-3 px-4 text-gray-700 font-semibold">Bank</th>
              <th className="py-3 px-4 text-gray-700 font-semibold">Currency</th>
              <th className="py-3 px-4 text-gray-700 font-semibold">Amount</th>
              <th className="py-3 px-4 text-gray-700 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTx.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTx.map(({ id, recipientName, recipientBank, currency, amount, date }) => (
                <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{recipientName}</td>
                  <td className="py-3 px-4">{recipientBank}</td>
                  <td className="py-3 px-4">{currency}</td>
                  <td className="py-3 px-4">${amount.toFixed(2)}</td>
                  <td className="py-3 px-4">{date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
