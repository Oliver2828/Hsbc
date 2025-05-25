import React, { useState, useEffect, useMemo } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const CollapseTransition = ({ children, isOpen }) => (
  <div
    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`}
  >
    <div className="min-h-0">{children}</div>
  </div>
);

const TransactionSection = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {children}
  </div>
);

const TransactionTable = ({ transactions, showBalance = false }) => (
  <div className="overflow-x-auto rounded-lg shadow-sm">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {["Date", "Description", "Amount", "Type", ...(showBalance ? ["Balance"] : [])].map((header) => (
            <th
              key={header}
              className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <tr
            key={`${transaction.date}-${transaction.balance}`}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 text-sm text-gray-700">{transaction.date}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
              {transaction.description}
            </td>
            <td className="px-4 py-3 text-sm text-right font-medium text-green-600">
              {transaction.amount}
            </td>
            <td className="px-4 py-3 text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {transaction.type}
              </span>
            </td>
            {showBalance && (
              <td className="px-4 py-3 text-sm text-right font-medium text-purple-600">
                {transaction.balance}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Transactions = () => {
  const [transactionsByYear, setTransactionsByYear] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedYears, setExpandedYears] = useState(new Set());
  const [expandedMonths, setExpandedMonths] = useState(new Set());

  const allTransactions = useMemo(() => {
    const startDate = new Date("2022-03-01");
    const endDate = new Date();
    const transactions = [];
    let balance = 2000;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) {
        balance += 3000;
        const date = new Date(currentDate);
        transactions.push({
          date: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          description: "Daily Business Income",
          amount: "+$3,000.00",
          type: "Credit",
          balance: balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          rawDate: date.toISOString().split("T")[0],
          year: date.getFullYear().toString(),
          month: date.toLocaleString("default", { month: "long" }),
          day: date.getDate().toString(),
          timestamp: date.getTime(),
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return transactions.reverse();
  }, []);

  useEffect(() => {
    const yearlyData = {};
    allTransactions.forEach((txn) => {
      const { year, month } = txn;
      if (!yearlyData[year]) yearlyData[year] = {};
      if (!yearlyData[year][month]) yearlyData[year][month] = [];
      yearlyData[year][month].push(txn);
    });

    setTransactionsByYear(yearlyData);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    setExpandedYears(new Set([currentYear]));
    setExpandedMonths(new Set([`${currentYear}-${currentMonth}`]));
  }, [allTransactions]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return transactionsByYear;

    const lowerQuery = searchQuery.toLowerCase().trim();
    const parts = lowerQuery.split(/\s+|[-/]/);
    const filtered = {};

    for (const [year, months] of Object.entries(transactionsByYear)) {
      for (const [month, txns] of Object.entries(months)) {
        const matches = txns.filter((txn) => {
          const combinedFields = [
            txn.rawDate,
            txn.description.toLowerCase(),
            txn.amount.toLowerCase(),
            txn.type.toLowerCase(),
            txn.year,
            txn.month.toLowerCase(),
            txn.day,
          ];
          return parts.every((part) => combinedFields.some((field) => field.includes(part)));
        });

        if (matches.length) {
          if (!filtered[year]) filtered[year] = {};
          filtered[year][month] = matches;
        }
      }
    }

    return filtered;
  }, [searchQuery, transactionsByYear]);

  const recentTransactions = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return allTransactions.filter(txn => new Date(txn.rawDate) >= thirtyDaysAgo).reverse();
  }, [allTransactions]);

  const accountStatement = useMemo(() => {
    const statement = [];
    let runningBalance = 2000;

    statement.push({
      date: "March 1, 2022",
      description: "Opening Balance",
      amount: "$2,000.00",
      type: "Initial",
      balance: "$2,000.00",
      rawDate: "2022-03-01",
    });

    recentTransactions.forEach(txn => {
      runningBalance += 3000;
      statement.push({
        ...txn,
        balance: runningBalance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      });
    });

    return statement;
  }, [recentTransactions]);

  const toggleYear = (year) => {
    setExpandedYears((prev) =>
      new Set(prev.has(year) ? [...prev].filter((y) => y !== year) : [...prev, year])
    );
  };

  const toggleMonth = (monthKey) => {
    setExpandedMonths((prev) =>
      new Set(prev.has(monthKey) ? [...prev].filter((m) => m !== monthKey) : [...prev, monthKey])
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600 mb-6">Monitor your financial activity in real time</p>

        <div className="relative max-w-md mx-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search transactions by date, type or amount"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <TransactionSection title="🔄 Recent Transactions (Last 30 Days)">
        <div className="bg-white rounded-lg shadow-md p-4">
          <TransactionTable transactions={recentTransactions} />
        </div>
      </TransactionSection>

      {/* Account Statement */}
      <TransactionSection title="📄 Account Statement">
        <div className="bg-white rounded-lg shadow-md p-4">
          <TransactionTable transactions={accountStatement} showBalance={true} />
        </div>
      </TransactionSection>

      {/* Full History */}
      <TransactionSection title="📚 Full Transaction History">
        <div className="space-y-4">
          {Object.entries(filteredData).map(([year, months]) => (
            <div key={year} className="border rounded-lg bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">{year}</span>
                {expandedYears.has(year) ? (
                  <FiChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>

              <CollapseTransition isOpen={expandedYears.has(year)}>
                <div className="space-y-4 p-4 pt-2">
                  {Object.entries(months).map(([month, txns]) => {
                    const monthKey = `${year}-${month}`;
                    return (
                      <div key={monthKey} className="border rounded-lg">
                        <button
                          onClick={() => toggleMonth(monthKey)}
                          className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-700">{month}</span>
                          {expandedMonths.has(monthKey) ? (
                            <FiChevronUp className="h-5 w-5 text-gray-600" />
                          ) : (
                            <FiChevronDown className="h-5 w-5 text-gray-600" />
                          )}
                        </button>

                        <CollapseTransition isOpen={expandedMonths.has(monthKey)}>
                          <div className="p-4 pt-2">
                            <TransactionTable transactions={txns} showBalance={true} />
                          </div>
                        </CollapseTransition>
                      </div>
                    );
                  })}
                </div>
              </CollapseTransition>
            </div>
          ))}
        </div>
      </TransactionSection>
    </div>
  );
};

export default Transactions;
