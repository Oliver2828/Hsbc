import React, { useState, useEffect } from "react";

const PayBills = ({ onClose }) => {
  const [formData, setFormData] = useState({
    billerName: "",
    billerAccount: "",
    amountDue: "",
    paymentDate: "",
    paymentType: "One-Time",
    securityPin: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // Tracks the current step of the form
  const [errors, setErrors] = useState({}); // Tracks validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the payment is submitted

  // Automatically set the current date for paymentDate
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    setFormData((prevData) => ({
      ...prevData,
      paymentDate: currentDate,
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
      if (!formData.billerName) stepErrors.billerName = "Biller name is required.";
      if (!formData.billerAccount) stepErrors.billerAccount = "Biller account number is required.";
    } else if (currentStep === 2) {
      if (!formData.amountDue) stepErrors.amountDue = "Amount due is required.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
    } else {
      setIsSubmitting(true); // Start loading
      setTimeout(() => {
        setIsSubmitting(false); // Stop loading
        setIsSubmitted(true); // Mark as submitted
        setTimeout(() => {
          onClose(); // Close the modal after showing the success message
        }, 3000); // Show success message for 3 seconds
      }, 5000); // Simulate 5 seconds of loading
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
          <h5 className="mt-3 text-[#1A3D8F]">Processing Payment...</h5>
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg p-5">
          <i className="fas fa-check-circle text-4xl text-[#1A3D8F]"></i>
          <h4 className="mt-4 text-[#1A3D8F]">Payment Submitted Successfully!</h4>
        </div>
      )}

      {/* Form */}
      {!isSubmitting && !isSubmitted && (
        <form onSubmit={handleSubmit}>
          {/* Step 1: Biller Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h6 className="text-lg font-semibold">Biller Information</h6>
              <div>
                <label htmlFor="billerName" className="block text-sm font-medium text-gray-700">
                  Biller Name
                </label>
                <input
                  type="text"
                  id="billerName"
                  name="billerName"
                  value={formData.billerName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.billerName ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.billerName && <p className="mt-1 text-sm text-red-600">{errors.billerName}</p>}
              </div>
              <div>
                <label htmlFor="billerAccount" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  id="billerAccount"
                  name="billerAccount"
                  value={formData.billerAccount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.billerAccount ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.billerAccount && (
                  <p className="mt-1 text-sm text-red-600">{errors.billerAccount}</p>
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

          {/* Step 2: Payment Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h6 className="text-lg font-semibold">Payment Details</h6>
              <div>
                <label htmlFor="amountDue" className="block text-sm font-medium text-gray-700">
                  Amount Due
                </label>
                <input
                  type="text"
                  id="amountDue"
                  name="amountDue"
                  value={formData.amountDue}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.amountDue ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]`}
                />
                {errors.amountDue && <p className="mt-1 text-sm text-red-600">{errors.amountDue}</p>}
              </div>
              <div>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
                  Payment Date
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
                  Payment Type
                </label>
                <select
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F]"
                >
                  <option value="One-Time">One-Time</option>
                  <option value="Recurring">Recurring</option>
                </select>
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
              <div>
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
                {errors.securityPin && <p className="mt-1 text-sm text-red-600">{errors.securityPin}</p>}
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
                  Confirm Payment
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PayBills;