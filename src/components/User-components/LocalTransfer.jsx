import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import LocalTransferForm from "../Forms/LocalTransferForm"; // ensure this component works frontend-only

const LocalTransfer = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);

  // Dummy accounts for frontend testing
  const userAccounts = [
    { id: 1, name: "Checking Account", number: "1234567890", balance: "$5,000" },
    { id: 2, name: "Savings Account", number: "0987654321", balance: "$10,000" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
        Local Transfers
      </h2>

      <div className="bg-white border border-red-200 p-6 rounded-lg shadow mb-6">
        <h5 className="text-xl font-semibold text-red-700 mb-2">
          Transfer Money Within the U.S.
        </h5>
        <p className="text-gray-700 mb-4">
          Use this service to send money between U.S. bank accounts. Funds
          typically arrive same-day or next business day depending on the
          receiving bank.
        </p>
        <ul className="list-disc text-sm text-gray-700 pl-5 space-y-1">
          <li>✅ No international fees</li>
          <li>✅ Instant routing for domestic banks</li>
          <li>✅ Secure encrypted transfer</li>
        </ul>
      </div>

      <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 rounded mb-6">
        💡 <strong>Tip:</strong> Double-check routing and account numbers to avoid failed transfers.
      </div>

      <div className="text-center my-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-medium px-6 py-3 rounded-lg shadow transition-all duration-300"
          onClick={() => setShowTransferForm(true)}
        >
          Initiate Local Transfer
        </button>
      </div>

      <div className="bg-white border border-red-200 p-6 rounded-lg shadow mt-8">
        <h5 className="text-xl font-semibold text-red-700 mb-3">
          How Local Transfers Work
        </h5>
        <ol className="list-decimal text-sm text-gray-700 pl-5 space-y-1">
          <li>Enter the recipient's bank account details.</li>
          <li>Verify your details and authorize the transfer.</li>
          <li>Funds are processed securely and sent within 24 hours.</li>
        </ol>
      </div>

      <Modal
        isOpen={showTransferForm}
        onClose={() => setShowTransferForm(false)}
        title="Local Bank Transfer"
      >
        <LocalTransferForm
          userAccounts={userAccounts}
          onClose={() => setShowTransferForm(false)}
        />
      </Modal>
    </div>
  );
};

export default LocalTransfer;
