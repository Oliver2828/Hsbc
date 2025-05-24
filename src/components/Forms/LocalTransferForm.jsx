import React, { useState, useEffect } from "react";

const LocalTransfer = ({ onClose, userAccounts }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
    recipientRouting: "",
    amount: "",
    transferType: "Personal",
    transferDate: "",
    reference: "",
    securityPin: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // Tracks the current step of the form
  const [errors, setErrors] = useState({}); // Tracks validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the transfer is submitted
  const [approvalStatus, setApprovalStatus] = useState("Pending"); // Tracks approval status

  // Automatically set the current date and time for transferDate
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    setFormData((prevData) => ({
      ...prevData,
      transferDate: currentDate,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error for the field being updated
    });
  };

  const validateStep = () => {
    const stepErrors = {};
    if (currentStep === 1) {
      if (!formData.recipientName) stepErrors.recipientName = "Recipient's name is required.";
      if (!formData.recipientAccount) stepErrors.recipientAccount = "Recipient's account number is required.";
      if (!formData.recipientBank) stepErrors.recipientBank = "Recipient's bank name is required.";
      if (!formData.recipientRouting) stepErrors.recipientRouting = "Recipient's routing number is required.";
    } else if (currentStep === 2) {
      if (!formData.amount) stepErrors.amount = "Transfer amount is required.";
    } else if (currentStep === 3) {
      if (!formData.securityPin) stepErrors.securityPin = "Security PIN is required.";
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Debugging
  
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length > 0) {
      console.log("Validation errors:", stepErrors); // Debugging
      setErrors(stepErrors);
      return;
    }
  
    setIsSubmitting(true); // Start loading
  
    // Debugging: Log userAccounts
    console.log("User accounts:", userAccounts);
  
    // Find the Savings Account
    const savingsAccount =
      userAccounts && userAccounts.length > 0
        ? userAccounts.find((acc) => acc.type === "Savings Account")
        : null;
  
    if (!savingsAccount) {
      console.log("No Savings Account available."); // Debugging
      setErrors({ general: "No Savings Account available to debit from." });
      setIsSubmitting(false);
      return;
    }
  
    const transferData = {
      ...formData,
      debitedAccount: savingsAccount.number, // Use the Savings Account
    };
  
    try {
      console.log("Sending transfer data to backend:", transferData); // Debugging
  
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
  
      const response = await fetch("http://localhost:5000/api/auth/transfers/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(transferData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to process transfer.");
      }
  
      console.log("Transfer submitted successfully"); // Debugging
  
      // Simulate approval delay
      setTimeout(() => {
        setApprovalStatus("Approved");
        setIsSubmitted(true); // Mark as submitted
        setTimeout(() => {
          onClose(); // Close the modal after showing the success message
        }, 3000); // Show success message for 3 seconds
      }, 10000); // Approve after 10 seconds
    } catch (error) {
      console.error("Error processing transfer:", error);
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

   return (
    <div className="mt-4">
      {/* Loading State */}
      {isSubmitting && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg p-5">
          <div
            className="w-12 h-12 border-4 border-[#1A3D8F] border-t-transparent rounded-full animate-spin"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <h5 className="mt-3 text-[#1A3D8F]">Processing Transfer...</h5>
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg p-5">
          <i className="fas fa-check-circle text-[4rem] text-[#1A3D8F]"></i>
          <h4 className="mt-4 text-[#1A3D8F]">Transfer Approved Successfully!</h4>
        </div>
      )}

      {/* Form */}
      {!isSubmitting && !isSubmitted && (
        <form onSubmit={handleSubmit}>
          {/* Step 1: Recipient's Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h6 className="text-lg font-semibold">Recipient's Information</h6>
              <div className="mb-4">
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.recipientName ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.recipientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>
                )}
              </div>
              
              {/* Repeat similar structure for other Step 1 fields */}
              <div className="mb-4">
                <label htmlFor="recipientAccount" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  id="recipientAccount"
                  name="recipientAccount"
                  value={formData.recipientAccount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.recipientAccount ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.recipientAccount && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipientAccount}</p>
                )}
              </div>

              <button
                type="button"
                className="w-full mt-3 bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Transfer Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h6 className="text-lg font-semibold">Transfer Details</h6>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Security Verification */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h6 className="text-lg font-semibold">Security Verification</h6>
              <div className="mb-4">
                <label htmlFor="securityPin" className="block text-sm font-medium text-gray-700">
                  Security PIN
                </label>
                <input
                  type="password"
                  id="securityPin"
                  name="securityPin"
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.securityPin ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.securityPin && (
                  <p className="mt-1 text-sm text-red-600">{errors.securityPin}</p>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors"
                >
                  Submit Transfer
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};


export default LocalTransfer;