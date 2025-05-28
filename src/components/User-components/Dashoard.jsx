import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import LocalTransfer from "../Forms/LocalTransferForm";
import InternationalTransfer from "../Forms/InternationTransfer";
import PayBills from "../Forms/PayBills";
import TransactionHistoryTable from "./TransactionHistoryTable";
import CreditCard from "../User-components/CreditCards";
import LoanApplication from "../Forms/LoanApplication";
import {
  FaExchangeAlt,
  FaFileInvoice,
  FaMobileAlt,
  FaChartLine,
  FaUserCircle,
  FaSearch,
  FaMoneyCheckAlt,
  FaGlobeAmericas,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";
import { FiSend, FiDownload, FiEye } from "react-icons/fi";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
  //     if (!token) {
  //       console.error("No token found in localStorage. Redirecting to login...");
  //       navigate("/login");
  //       return;
  //     }
  
  //     try {
  //       console.log("Fetching user data...");
  //       const userResponse = await axios.get("http://localhost:5000/api/auth/user", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUsername(userResponse.data.user.username);
  //       console.log("Fetched user data:", userResponse.data);
  
  //       const accountsResponse = await axios.get("http://localhost:5000/api/auth/accounts", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setAccounts(accountsResponse.data.accounts);
  //       console.log("Fetched accounts:", accountsResponse.data);
  
  //       const transactionsResponse = await axios.get("http://localhost:5000/api/auth/transfers", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log("Fetched transactions:", transactionsResponse.data);
  //       setTransactions(transactionsResponse.data.transfers || []); // Ensure transactions is always an array
  //       setFilteredTransactions(transactionsResponse.data.transfers || []); // Initialize filtered transactions
  //     } catch (error) {
  //       console.error("Error fetching user data, accounts, or transactions:", error);
  
  //       if (error.response && error.response.status === 403) {
  //         localStorage.removeItem("token");
  //         navigate("/login");
  //       }
  //     }
  //   };
  
  //   fetchUserData();

    // Mocked user data
    setUsername("James Philips");
    setAccounts([
      { number: "456*******", type: "Savings", balance: 2645500.75 },
      { number: "987*******", type: "Checking", balance: 237500.0 },
      // { number: "9876543234", type: "Investment", balance: 7200.5 },
    ]);
    const mockTx = [
  {
    id: 1,
    recipientName: "Jane Smith",
    recipientBank: "Chase",
    currency: "USD",
    amount: 300.0,
    transferDate: "2025-05-01", // <-- change here
  },
  {
    id: 2,
    recipientName: "Amazon",
    recipientBank: "PayPal",
    currency: "USD",
    amount: 120.99,
    transferDate: "2025-05-02", // <-- change here
  },
];
    setTransactions(mockTx);
    setFilteredTransactions(mockTx);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((t) =>
      [t.recipientName, t.recipientBank, t.currency]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchQuery, transactions]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const quickActions = [
    {
      id: 1,
      name: "Send Money",
      icon: <FaExchangeAlt className="text-xl text-blue-600" />,
      content: (
        <div className="text-center space-y-4">
          <h6 className="text-lg font-semibold text-neutral-800">Choose Transfer</h6>
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
              onClick={() => navigate("/user/local-transfer")}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaMoneyCheckAlt className="text-blue-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-neutral-700">Local</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
              onClick={() => navigate("/user/international-transfer")}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaGlobeAmericas className="text-blue-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-neutral-700">International</span>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: "Pay Bills",
      icon: <FaFileInvoice className="text-xl text-blue-600" />,
      content: <PayBills />,
    },
    {
      id: 3,
      name: "E-Statement",
      icon: <FaMobileAlt className="text-xl text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600">
            Your e-statement will arrive in your registered email within 10 minutes.
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-2xl hover:opacity-90"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Invest",
      icon: <FaChartLine className="text-xl text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600">
            Explore secure investment options to grow your wealth.
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-2xl hover:opacity-90"
            onClick={() => setActiveModal("InvestDetails")}
          >
            Contact Advisor
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800">
            Good morning, {username}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Here's what's happening with your money today
          </p>
        </div>
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shrink-0"
          onClick={() => navigate("")}
        >
          <FaUserCircle className="text-xl sm:text-2xl" />
        </button>
      </motion.div>

      {/* Account Overview */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-800">Account Overview</h2>
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${totalBalance.toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {accounts.map((acct) => (
            <motion.div
              key={acct.number}
              whileHover={{ scale: 1.02 }}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-sm sm:shadow-md hover:shadow-md transition"
            >
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-medium text-neutral-800">{acct.type}</h3>
                <p className="text-xs sm:text-sm text-neutral-500">{acct.number}</p>
              </div>
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl font-semibold text-blue-600">
                  ${acct.balance.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-blue-600 font-medium">
                <button className="hover:underline flex items-center gap-1">
                  <FiSend className="text-sm" /> Transfer
                </button>
                <button className="hover:underline flex items-center gap-1">
                  <FiDownload className="text-sm" /> Deposit
                </button>
                <button className="hover:underline flex items-center gap-1">
                  <FiEye className="text-sm" /> Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-800 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <motion.div
              key={action.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md hover:shadow-md cursor-pointer transition-all flex flex-col items-center"
              onClick={() => setActiveModal(action.name)}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center mb-1 sm:mb-2">
                {React.cloneElement(action.icon, { className: "text-lg sm:text-xl" })}
              </div>
              <span className="text-xs sm:text-sm font-medium text-neutral-700 text-center">
                {action.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-800">Your Cards</h2>
          <p className="text-xs sm:text-sm text-neutral-500">Manage your payment cards</p>
        </div>
        <div className="p-4 sm:p-6">
          {cardDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Card components */}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <FaCreditCard className="text-4xl sm:text-5xl text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">No cards linked yet</p>
              <button
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-2 rounded-xl sm:rounded-2xl text-sm sm:text-base hover:opacity-90"
                onClick={() => navigate("/user/cards")}
              >
                Add a Card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-800">Recent Transactions</h2>
            </div>
            <div className="w-full sm:w-64 relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <TransactionHistoryTable
            transactions={filteredTransactions}
            totalTransactions={filteredTransactions.length}
            limit={5}
            currentPage={1}
            showPagination={false}
          />
          <div className="mt-4 sm:mt-6 text-center">
            <button
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base flex items-center gap-2 justify-center"
              onClick={() => navigate("/user/transactions")}
            >
              View Full History <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {quickActions.map((action) =>
        activeModal === action.name && (
          <Modal
            key={action.id}
            isOpen
            onClose={() => setActiveModal(null)}
            title={action.name}
            className="max-w-md sm:max-w-lg"
          >
            <div className="text-sm sm:text-base">
              {action.content}
            </div>
          </Modal>
        )
      )}
    </div>
  );
};

export default Dashboard;