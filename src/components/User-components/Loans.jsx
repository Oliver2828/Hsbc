import React from "react";
import LoanApplication from "../Forms/LoanApplication";
import LoanHistoryTable from "../User-components/LoanHistoryTable";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

const Loan = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#B91C1C] to-[#EF4444] bg-clip-text text-transparent">
              Loan Services
            </h1>
            <p className="mt-3 text-gray-600">Manage your loans and applications</p>
          </div>
          <BuildingLibraryIcon className="h-14 w-14 text-[#B91C1C]/40" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Loan Application Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow h-fit lg:sticky lg:top-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-10 w-2 bg-[#B91C1C] rounded-full" />
                <h2 className="text-3xl font-semibold text-gray-800">
                  New Loan Application
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Get instant approval for your loan with our quick application process.
              </p>
              <LoanApplication />
            </div>
          </div>

          {/* Loan History Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-2 bg-[#B91C1C] rounded-full" />
                <h2 className="text-3xl font-semibold text-gray-800">Loan History</h2>
              </div>
              <span className="bg-red-100 text-[#B91C1C] px-4 py-1 rounded-full text-sm font-medium">
                3 Active
              </span>
            </div>
            <div className="flow-root">
              <p className="text-gray-600 mb-6">
                Track your current loans and review previous applications
              </p>
              <LoanHistoryTable />
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#B91C1C] to-[#EF4444] rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Quick Facts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">1.95%</p>
              <p className="text-sm opacity-90">Lowest Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">24h</p>
              <p className="text-sm opacity-90">Fast Approval</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$50M+</p>
              <p className="text-sm opacity-90">Loans Disbursed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">4.8/5</p>
              <p className="text-sm opacity-90">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
