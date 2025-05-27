import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Popup from '../Pop-up-component/Popup';

function BankingNavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Banking', path: '/personal-banking' },
    { title: 'Markets and Securities Services', path: '/markets/trading', usePopup: true },
    { title: 'About HSBC Korea', path: '/about/history', usePopup: true },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const handleNavigation = (path, usePopup = false) => {
    if (usePopup) {
      setPendingRoute(path);
      setShowPopup(true);
    } else {
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.div
        className="bg-black grid grid-cols-12 h-[11vh] relative px-4 md:px-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex col-span-6 md:col-span-2 justify-start md:justify-end items-center md:pr-[40px]">
          <button
            className="md:hidden mr-4 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/banking">
            <div className="bg-[url(././assets/hsbc.svg)] bg-center bg-contain w-[80px] h-[40px] bg-no-repeat" />
          </a>
        </div>

        <div className="hidden md:flex items-center col-span-6">
          <ul className="flex gap-[20px] pl-[40px] text-white text-[18px] font-serif font-light">
            {menuItems.map((item, index) => (
              <li key={index} className="py-2 px-2">
                <motion.span
                  className="cursor-pointer text-white"
                  whileHover={{ scale: 1.05, color: '#e3342f' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleNavigation(item.path, item.usePopup)}
                >
                  {item.title}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid-cols-1 md:grid-cols-2 col-span-6 md:col-span-4 hidden md:grid items-center gap-2 md:gap-0">
          <div className="flex items-center justify-center relative">
            <button
              className="flex items-center gap-2 h-[45px] text-white bg-[#4e4b4b] w-full md:w-[170px] justify-center"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <span>{languages.find(l => l.name === selectedLanguage)?.flag}</span>
              {selectedLanguage}
              <motion.span
                animate={{ rotate: languageOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-white"
              >
                ▼
              </motion.span>
            </button>

            {languageOpen && (
              <div className="absolute top-full mt-2 w-full md:w-auto bg-[#4e4b4b] shadow-lg z-50 max-h-64 overflow-auto">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 cursor-pointer text-white hover:bg-white/10"
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setLanguageOpen(false);
                      window.changeLanguage(lang.code);
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={() => {
          navigate(pendingRoute);
          setShowPopup(false);
        }}
      />
    </>
  );
}

export default BankingNavBar;
