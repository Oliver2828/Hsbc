import React, { useState } from "react";
import Modal from "../Modal/Modal";
import LocalTransferForm from "../Forms/LocalTransferForm";
import {
  FiInfo,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

const LocalTransferPage = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [userAccounts] = useState([]);

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <header className="text-center mb-10 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 mb-4">
          Domestic Transfers
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Send money securely to any Korea bank account within minutes
        </p>
      </header>

      {/* Transfer Banner */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 sm:p-8 rounded-3xl shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="bg-red-600 p-3 rounded-lg">
            <FiArrowRight className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-red-700">
            Fast & Secure Transfers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiCheckCircle className="text-2xl text-green-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">No Hidden Fees</h3>
            <p className="text-sm text-gray-600">
              Transparent pricing with no surprises
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiClock className="text-2xl text-red-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">24/7 Availability</h3>
            <p className="text-sm text-gray-600">
              Transfer anytime, anywhere
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiShield className="text-2xl text-purple-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">Bank-Level Security</h3>
            <p className="text-sm text-gray-600">
              256-bit SSL encryption
            </p>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-red-50 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start gap-4 mb-8 border-l-4 border-red-600">
          <FiInfo className="text-xl text-red-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-700 mb-1">Pro Tip</p>
            <p className="text-sm text-gray-600">
              Double-check account numbers and routing numbers before sending.
              Transfers cannot be canceled once initiated.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowTransferForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl 
              font-semibold text-base sm:text-lg transition transform hover:scale-105 shadow-md"
          >
            Start New Transfer
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-red-700 mb-6 sm:mb-8">
          How It Works
        </h2>
        <div className="space-y-6">
          {["Enter Recipient Details", "Review & Confirm", "Transfer Complete"].map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{step}</h3>
                <p className="text-sm text-gray-600">
                  {idx === 0 && "Provide account information and transfer amount"}
                  {idx === 1 && "Verify all details and confirm transfer"}
                  {idx === 2 && "Funds typically arrive within 1 business day"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showTransferForm}
        onClose={() => setShowTransferForm(false)}
        title="New Domestic Transfer"
      >
        <LocalTransferForm
          userAccounts={userAccounts}
          onClose={() => setShowTransferForm(false)}
        />
      </Modal>
    </div>
  );
};

export default LocalTransferPage;
