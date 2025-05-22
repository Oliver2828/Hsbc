import { Download } from 'lucide-react';

export default function Banking4() {
  return (
    <section className="p-6 mx-[95px]">
      <h2 className="text-xl font-semibold mb-4 border-l-4 border-red-600 pl-3">
        Useful Information
      </h2>

      <div className="bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-800">
        <div className="flex items-start gap-2">
          <Download size={16} className="mt-1" />
          <span className="hover:underline cursor-pointer">Funds Transfer SmartForm</span>
        </div>
        <div className="hover:underline cursor-pointer">
          T&amp;C and Agreement <span className="text-red-600 ml-1">›</span>
        </div>
        <div className="hover:underline cursor-pointer">
          Phishing Warning <span className="text-red-600 ml-1">›</span>
        </div>

        <div className="hover:underline cursor-pointer">
          Service Cutoff Time for Electronic Fund Transfer <span className="text-red-600 ml-1">›</span>
        </div>
        <div className="hover:underline cursor-pointer">
          Interest Rate <span className="text-red-600 ml-1">›</span>
        </div>
        <div className="hover:underline cursor-pointer">
          Registration of Insured Financial Products (PDF, 100KB) <span className="text-red-600 ml-1">›</span>
        </div>

        <div className="hover:underline cursor-pointer">
          Tariff Table <span className="text-red-600 ml-1">›</span>
        </div>
        <div className="hover:underline cursor-pointer">
          Electronic Banking Dispute Settlement <span className="text-red-600 ml-1">›</span>
        </div>
        <div className="hover:underline cursor-pointer">
          Loan interest rate (corporate) <span className="text-red-600 ml-1">›</span>
          {/* hhhh */}
        </div>
      </div>
    </section>
  );
}
