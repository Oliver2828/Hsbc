import React, { useState } from "react";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    income: "",
    employmentStatus: "",
    creditScore: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.loanPurpose) newErrors.loanPurpose = "Purpose is required";
    if (!formData.loanTerm) newErrors.loanTerm = "Term is required";
    if (!formData.income) newErrors.income = "Income is required";
    if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required";
    if (!formData.creditScore) newErrors.creditScore = "Credit score is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token); // Debugging: Log the token
  
        const response = await fetch("http://localhost:5000/api/loans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(formData),
        });
  
        console.log("Response Status:", response.status); // Debugging: Log the response status
        const data = await response.json();
        console.log("Response Data:", data); // Debugging: Log the response data
  
        if (response.ok) {
          alert("Loan application submitted successfully!");
          setFormData({
            loanAmount: "",
            loanPurpose: "",
            loanTerm: "",
            income: "",
            employmentStatus: "",
            creditScore: "",
            additionalNotes: "",
          });
        } else {
          alert(data.error || "Failed to submit loan application");
        }
      } catch (error) {
        console.error("Error submitting loan application:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Loan Amount ($)
        </label>
        <input
          type="number"
          className={`block w-full rounded-md border ${
            errors.loanAmount ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          placeholder="Enter the total amount you wish to borrow"
        />
        {errors.loanAmount && <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Purpose of Loan
        </label>
        <select
          className={`block w-full rounded-md border ${
            errors.loanPurpose ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="loanPurpose"
          value={formData.loanPurpose}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="personal">Personal</option>
          <option value="home">Home</option>
          <option value="auto">Auto</option>
          <option value="education">Education</option>
        </select>
        {errors.loanPurpose && <p className="mt-1 text-sm text-red-600">{errors.loanPurpose}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Loan Term (in months)
        </label>
        <input
          type="number"
          className={`block w-full rounded-md border ${
            errors.loanTerm ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleChange}
          placeholder="e.g. 12 months, 24 months, etc."
        />
        {errors.loanTerm && <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Annual Income ($)
        </label>
        <input
          type="number"
          className={`block w-full rounded-md border ${
            errors.income ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="income"
          value={formData.income}
          onChange={handleChange}
          placeholder="Enter your annual income"
        />
        {errors.income && <p className="mt-1 text-sm text-red-600">{errors.income}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Employment Status
        </label>
        <select
          className={`block w-full rounded-md border ${
            errors.employmentStatus ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="student">Student</option>
        </select>
        {errors.employmentStatus && <p className="mt-1 text-sm text-red-600">{errors.employmentStatus}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Estimated Credit Score
        </label>
        <input
          type="number"
          className={`block w-full rounded-md border ${
            errors.creditScore ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2`}
          name="creditScore"
          value={formData.creditScore}
          onChange={handleChange}
          placeholder="Estimate or use your recent credit report"
        />
        {errors.creditScore && <p className="mt-1 text-sm text-red-600">{errors.creditScore}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A3D8F] mb-2">
          Additional Notes (optional)
        </label>
        <textarea
          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#1A3D8F] focus:ring-[#1A3D8F] p-2"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={3}
          placeholder="Add any additional information here"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#1A3D8F] text-white py-2 px-4 rounded-md hover:bg-[#15306f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Apply for Loan"}
      </button>
    </form>
  );
};

export default LoanApplication;