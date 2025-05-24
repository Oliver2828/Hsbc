import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaPlus,
  FaCreditCard,
  FaExchangeAlt,
  FaGlobe,
  FaReceipt,
  FaCoins,
  FaPiggyBank,
  FaSeedling,
  FaUniversity,
  FaTimes
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const navCategories = [
    {
      header: "Main",
      links: [
        { path: "/user/dashboard", label: "Dashboard", icon: FaHome },
        { path: "/user/transactions", label: "Transactions", icon: FaHistory },
        { path: "/user/deposit", label: "Deposit", icon: FaPlus },
        { path: "/user/cards", label: "Cards", icon: FaCreditCard },
      ],
    },
    {
      header: "Transfers",
      links: [
        { path: "/user/local-transfer", label: "Local Transfers", icon: FaExchangeAlt },
        { path: "/user/international-transfer", label: "International Transfers", icon: FaGlobe },
      ],
    },
    {
      header: "Services",
      links: [
        { path: "/user/pay-bills", label: "Bill Payment", icon: FaReceipt },
        { path: "/user/loans", label: "Loan", icon: FaCoins },
        { path: "/user/savings", label: "Savings", icon: FaPiggyBank },
        { path: "/user/investments", label: "Investments", icon: FaSeedling },
      ],
    },
  ];

  const renderLinks = () =>
    navCategories.map((category, idx) => (
      <div key={idx} className="mb-6">
        <h6 className="text-sm uppercase font-semibold text-gray-400 mb-4 pb-2 border-b border-gray-200">
          {category.header}
        </h6>
        <ul className="space-y-2">
          {category.links.map(link => {
            const active = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeSidebar}
                  title={link.label}
                  className={`group flex items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    active
                      ? "border-l-4 border-red-500 bg-red-100 text-black"
                      : "text-gray-600 hover:bg-red-500 hover:text-black"
                  }`}
                >
                  <link.icon
                    className={`mr-3 w-5 h-5 p-1 rounded-full transition ${
                      active
                        ? "bg-red-100 text-red-500"
                        : "text-gray-500 group-hover:bg-red-500 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ));

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden m-4 z-[1050] bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl hover:bg-red-600 active:scale-95 transition-transform"
      >
        ☰
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed w-64 h-screen bg-white shadow-xl z-[1040] p-4 overflow-y-auto">
        <div className='flex justify-end items-center pr-[40px]'>
          <a href="/">
            <div
              className='bg-[url(././assets/hsbc-logo.svg)]
                         bg-center bg-contain
                         w-[100px] h-[40px]
                         bg-no-repeat'
            />
          </a>
        </div>
        {renderLinks()}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-[1040] lg:hidden"
            onClick={closeSidebar}
          />

          <div className="fixed lg:hidden w-64 h-screen bg-white shadow-xl z-[1050] p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <FaUniversity className="text-red-500 text-2xl mr-3" />
                <span className="font-bold text-gray-900 text-xl">Neon Trust Bank</span>
              </div>
              <button
                onClick={closeSidebar}
                className="text-3xl text-gray-600 hover:text-red-500 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            {renderLinks()}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
