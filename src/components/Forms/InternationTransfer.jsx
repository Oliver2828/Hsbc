import React, { useState, useEffect } from "react";
import { FiUser, FiDollarSign, FiLock, FiCheckCircle, FiArrowLeft, FiArrowRight, FiGlobe, FiInfo } from "react-icons/fi";

const InternationalTransfer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
    recipientSwift: "",
    recipientIban: "",
    recipientCountry: "",
    amount: "",
    currency: "USD",
    transferType: "Personal",
    transferDate: "",
    reference: "",
    securityPin: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData((p) => ({ ...p, transferDate: today }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateStep = () => {
    const err = {};
    if (currentStep === 1) {
      if (!formData.recipientName) err.recipientName = "Required.";
      if (!formData.recipientAccount) err.recipientAccount = "Required.";
      if (!formData.recipientBank) err.recipientBank = "Required.";
      if (!formData.recipientSwift) err.recipientSwift = "Required.";
      if (!formData.recipientCountry) err.recipientCountry = "Required.";
    }
    if (currentStep === 2 && !formData.amount) err.amount = "Required.";
    if (currentStep === 3 && !formData.securityPin) err.securityPin = "Required.";
    return err;
  };

  const handleNext = () => {
    const err = validateStep();
    if (Object.keys(err).length) setErrors(err);
    else setCurrentStep((s) => s + 1);
  };
  const handlePrevious = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 3000));
      setApprovalStatus("Approved");
      setIsSubmitted(true);
      setTimeout(onClose, 3000);
    } catch {
      setErrors({ general: "Transfer failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, label: "Recipient", icon: <FiUser /> },
    { id: 2, label: "Amount", icon: <FiDollarSign /> },
    { id: 3, label: "Security", icon: <FiLock /> },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Loading */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-red-600 font-medium">Processing Transfer...</p>
        </div>
      )}

      {/* Success */}
      {isSubmitted && (
        <div className="text-center py-12">
          <FiCheckCircle className="mx-auto mb-4 text-green-500 text-5xl animate-pulse" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Transfer Initiated!</h2>
          <p className="text-gray-600 mb-6">We’ll notify you once it’s complete.</p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {/* Form */}
      {!isSubmitting && !isSubmitted && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress */}
          <div className="relative mb-8">
            <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div
              className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            <div className="flex justify-between relative z-10">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition ${
                      currentStep >= s.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep >= s.id ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg flex items-start gap-3">
                <FiInfo className="text-xl text-red-600 mt-1" />
                <p className="text-sm text-gray-600">
                  Enter recipient details accurately to avoid delays.
                </p>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.recipientName ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Jane Doe"
                />
                {errors.recipientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Account Number</label>
                  <input
                    name="recipientAccount"
                    value={formData.recipientAccount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientAccount ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="123456789"
                  />
                  {errors.recipientAccount && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientAccount}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">SWIFT/BIC Code</label>
                  <input
                    name="recipientSwift"
                    value={formData.recipientSwift}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientSwift ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="ABCDUSXX"
                  />
                  {errors.recipientSwift && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientSwift}</p>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Bank Name</label>
                  <input
                    name="recipientBank"
                    value={formData.recipientBank}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientBank ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="International Bank"
                  />
                  {errors.recipientBank && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientBank}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Country</label>
                  <select
                    name="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientCountry ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                  </select>
                  {errors.recipientCountry && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientCountry}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                      errors.amount ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  Exchange rate: 1 USD = 0.85 EUR
                </p>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  Confirm to initiate; can’t be undone.
                </p>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Security PIN</label>
                <input
                  type="password"
                  name="securityPin"
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.securityPin ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="••••"
                />
                {errors.securityPin && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityPin}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center text-gray-600 hover:text-red-600 transition"
              >
                <FiArrowLeft className="mr-2" /> Back
              </button>
            )}
            <div className="ml-auto">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
                >
                  Continue <FiArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
                >
                  Confirm <FiCheckCircle className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default InternationalTransfer;
