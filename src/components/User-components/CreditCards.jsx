import React, { useState } from "react";
import { 
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaCcDinersClub,
  FaSimCard
} from "react-icons/fa";

const CreditCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const cardDesigns = {
    Visa: "#1a3d8f",
    MasterCard: "#ff6f61",
    Discover: "#f4a261",
    "American Express": "#2a9d8f",
    Verve: "#6a0572",
  };

  const CardIcons = {
    Visa: FaCcVisa,
    MasterCard: FaCcMastercard,
    Discover: FaCcDiscover,
    "American Express": FaCcAmex,
    Verve: FaCcDinersClub,
  };

  const CardIcon = CardIcons[card.brand] || FaCcVisa;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-52 perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
            isFlipped ? "rotate-y-180" : ""
          } preserve-3d`}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full rounded-xl p-6 backface-hidden"
            style={{ backgroundColor: cardDesigns[card.brand] || "#1a3d8f" }}
          >
            <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">
              {card.type} Card
            </div>

            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-8 rounded-sm" />
                <CardIcon className="text-3xl text-white/90" />
              </div>

              <div className="space-y-4 text-white">
                <p className="text-xl font-mono tracking-wider">
                  {showNumber ? card.number : "**** **** **** 3456"}
                </p>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-xs opacity-80">Card Holder</p>
                    <p className="font-semibold">{card.holder}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Expires</p>
                    <p className="font-semibold">{card.expiry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full rounded-xl bg-gray-800 rotate-y-180 backface-hidden p-6">
            <div className="h-full flex flex-col justify-between">
              <div className="h-8 bg-black w-full" />
              <div className="flex flex-col items-end space-y-2">
                <div className="bg-white/90 px-3 py-1 rounded text-black text-right">
                  <p className="text-xs">CVV</p>
                  <p className="font-mono">{showNumber ? card.cvv : "***"}</p>
                </div>
                <div className="w-3/4 border-t-2 border-white/20" />
                <p className="text-xs text-white/70 italic">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setShowNumber((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium text-white bg-[#1A3D8F] rounded-lg hover:bg-[#153176] transition-colors"
        >
          {showNumber ? "Hide Number" : "Show Number"}
        </button>
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {isFlipped ? "Show Front" : "Show Back"}
        </button>
      </div>
    </div>
  );
};

export default CreditCard;