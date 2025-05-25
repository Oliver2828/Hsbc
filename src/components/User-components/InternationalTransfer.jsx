import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import LocalTransferForm from "../Forms/LocalTransferForm";  // <-- imported

const InternationalTransfer = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);

  // Dummy user accounts
  const userAccounts = [
    { id: 1, name: "USD Checking Account", number: "123456789", balance: "$3,200" },
    { id: 2, name: "EUR Savings Account", number: "987654321", balance: "€5,400" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ... rest of your code ... */}

      <Modal
        isOpen={showTransferForm}
        onClose={() => setShowTransferForm(false)}
        title="International Bank Transfer"
      >
        {/* Use the imported LocalTransferForm here */}
        <LocalTransferForm
          userAccounts={userAccounts}
          onClose={() => setShowTransferForm(false)}
        />
      </Modal>
    </div>
  );
};

export default InternationalTransfer;
