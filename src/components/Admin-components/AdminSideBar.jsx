// src/components/AdminSidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import {
  FaHome,
  FaUsers,
  FaShieldAlt,
  FaFileInvoice,
  FaCog,
  FaTimes,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";

const scrollbarStyles = `
  .admin-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ef4444 transparent;
  }

  .admin-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .admin-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .admin-scrollbar::-webkit-scrollbar-thumb {
    background-color: #ef4444;
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
`;

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollControls, setShowScrollControls] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const sidebarRef = useRef(null);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' },
    { code: 'es', name: 'Spanish' },
    // ... other languages
  ];

  const navCategories = [
    {
      header: "Admin Controls",
      links: [
        { path: "/admin", label: "Dashboard", icon: FaHome },
        { path: "/admin/users", label: "User Management", icon: FaUsers },
        { path: "/admin/transactions", label: "Transactions", icon: FaFileInvoice },
        { path: "/admin/security", label: "Security", icon: FaShieldAlt },
      ],
    },
    {
      header: "System",
      links: [
        { path: "/admin/settings", label: "Settings", icon: FaCog },
      ],
    },
  ];

  // Scroll detection and sidebar logic
  const checkScroll = () => {
    if (sidebarRef.current) {
      const { scrollHeight, clientHeight } = sidebarRef.current;
      setShowScrollControls(scrollHeight > clientHeight);
    }
  };

  const scroll = (direction) => {
    if (sidebarRef.current) {
      const scrollAmount = direction === 'up' ? -200 : 200;
      sidebarRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = sidebarRef.current;
    currentRef?.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => currentRef?.removeEventListener('scroll', checkScroll);
  }, []);

  const renderLinks = () => navCategories.map((category, idx) => (
    <div key={idx} className="mb-6">
      <h6 className="text-sm uppercase font-semibold text-red-400 mb-4">
        {category.header}
      </h6>
      <ul className="space-y-2">
        {category.links.map(link => {
          const active = location.pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  active ? 'bg-red-500 text-white' : 'text-red-600 hover:bg-red-100'
                }`}
              >
                <link.icon className="mr-3 text-lg" />
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
      <style>{scrollbarStyles}</style>
      
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed lg:hidden z-50 m-4 bg-red-500 text-white p-2 rounded-lg"
      >
        ☰
      </button>

      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className="hidden lg:block fixed w-64 h-screen bg-white shadow-xl z-40 p-4 overflow-y-auto admin-scrollbar"
      >
        <div className="mb-8">
          <div className="bg-[url(./assets/hsbc-logo.svg)] bg-contain h-12 w-32 mb-6" />
          
          <div className="relative">
            <button
              className="w-full flex justify-between items-center p-2 bg-red-50 rounded-lg"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span>{selectedLanguage}</span>
              <motion.span animate={{ rotate: isLanguageOpen ? 180 : 0 }}>
                ▼
              </motion.span>
            </button>

            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg"
              >
                {languages.map(lang => (
                  <div
                    key={lang.code}
                    className="p-2 hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setIsLanguageOpen(false);
                    }}
                  >
                    {lang.name}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {renderLinks()}
        
        {showScrollControls && (
          <div className="sticky bottom-0 bg-gradient-to-t from-white pt-4">
            <div className="flex justify-end gap-2">
              <button
                onClick={() => scroll('up')}
                className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
              >
                <FaChevronUp />
              </button>
              <button
                onClick={() => scroll('down')}
                className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          />
          
          <div
            ref={sidebarRef}
            className="fixed lg:hidden w-64 h-screen bg-white shadow-xl z-40 p-4 overflow-y-auto admin-scrollbar"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="bg-[url(./assets/hsbc-logo.svg)] bg-contain h-12 w-32" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {renderLinks()}
          </div>
        </>
      )}
    </>
  );
}