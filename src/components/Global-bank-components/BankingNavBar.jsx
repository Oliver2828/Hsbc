import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '../Pop-up-component/Popup';

function BankingNavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeMenuPath, setActiveMenuPath] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState([]);
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Banking',
      submenu: [
        { 
          title: 'Personal Banking',
          path: '/personal-banking',
          submenu: [
            { title: 'Accounts', path: '/personal/accounts' },
            { title: 'Loans', path: '/personal/loans' },
            { title: 'Cards', path: '/personal/cards' }
          ]
        },
        { 
          title: 'Business Banking',
          path: '/business-banking',
          submenu: [
            { title: 'Business Accounts', path: '/business/accounts' },
            { title: 'Merchant Services', path: '/business/merchant' }
          ]
        }
      ]
    },
    { 
      title: 'Markets and Securities Services',
      submenu: [
        { title: 'Trading', path: '/markets/trading' },
        { title: 'Research', path: '/markets/research' },
        { 
          title: 'Advisory',
          submenu: [
            { title: 'M&A', path: '/advisory/ma' },
            { title: 'IPO', path: '/advisory/ipo' }
          ]
        }
      ]
    },
    { 
      title: 'About HSBC Korea',
      submenu: [
        { title: 'History', path: '/about/history' },
        { title: 'Leadership', path: '/about/leadership' },
        { title: 'Sustainability', path: '/about/sustainability' }
      ]
    }
  ];

  const languages = [
    { code: 'en',    name: 'English',    flag: '🇺🇸' },
    { code: 'es',    name: 'Spanish',    flag: '🇪🇸' },
    { code: 'zh-CN', name: 'Chinese',    flag: '🇨🇳' },
    { code: 'hi',    name: 'Hindi',      flag: '🇮🇳' },
    { code: 'ar',    name: 'Arabic',     flag: '🇸🇦' },
    { code: 'pt',    name: 'Portuguese', flag: '🇵🇹' },
    { code: 'bn',    name: 'Bengali',    flag: '🇧🇩' },
    { code: 'ru',    name: 'Russian',    flag: '🇷🇺' },
    { code: 'ja',    name: 'Japanese',   flag: '🇯🇵' },
    { code: 'de',    name: 'German',     flag: '🇩🇪' },
    { code: 'fr',    name: 'French',     flag: '🇫🇷' },
    { code: 'it',    name: 'Italian',    flag: '🇮🇹' },
    { code: 'ko',    name: 'Korean',     flag: '🇰🇷' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setActiveMenuPath([]);
    setIsMobileMenuOpen(false);
  };

  const requestRoute = (path) => {
    setPendingRoute(path);
    setShowPopup(true);
  };

  const submenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit:  { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const toggleMobileMenu = (title) => {
    setExpandedMobileMenus(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const renderSubmenu = (submenu, level = 1, parentPath = []) => (
    <AnimatePresence>
      {activeMenuPath.slice(0, level).join(',') === parentPath.join(',') && (
        <motion.ul
          key={parentPath.join('-')}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={submenuVariants}
          className={`
            absolute
            ${level === 1 ? 'top-full left-0' : 'top-0 left-full ml-2'}
            bg-gradient-to-br from-black/80 to-gray-900/80
            backdrop-blur-sm
            p-4
            min-w-[250px]
            rounded-xl
            shadow-2xl
            z-50
          `}
        >
          {submenu.map((item, idx) => {
            const currentPath = [...parentPath, item.title];
            const topLevel = parentPath[0];
            const onClickHandler = ['Markets and Securities Services', 'About HSBC Korea']
              .includes(topLevel)
              ? () => requestRoute(item.path)
              : () => handleNavigation(item.path);

            return (
              <motion.li
                key={idx}
                className="relative py-2 px-4 rounded-md cursor-pointer"
                onMouseEnter={() => setActiveMenuPath(currentPath)}
                onMouseLeave={() => setActiveMenuPath(parentPath)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <button
                    className="flex-1 text-white text-sm font-medium text-left"
                    onClick={onClickHandler}
                  >
                    {item.title}
                  </button>
                  {item.submenu && <span className="text-white/70 text-xs">›</span>}
                </div>
                {item.submenu && renderSubmenu(item.submenu, level + 1, currentPath)}
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );

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
              <li
                key={index}
                className="relative py-2 px-2"
                onMouseEnter={() => setActiveMenuPath([item.title])}
                onMouseLeave={() => setActiveMenuPath([])}
              >
                <motion.span
                  className="cursor-pointer text-white"
                  whileHover={{ scale: 1.05, color: '#e3342f' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (['Markets and Securities Services','About HSBC Korea'].includes(item.title)) {
                      setPendingRoute(item.submenu[0]?.path);
                      setShowPopup(true);
                    } else {
                      handleNavigation(item.submenu?.[0]?.path || '/');
                    }
                  }}
                >
                  {item.title}
                </motion.span>
                {renderSubmenu(item.submenu, 1, [item.title])}
              </li>
            ))}
          </ul>
        </div>

        <div className="  grid-cols-1 md:grid-cols-2 col-span-6 md:col-span-4 hidden md:grid items-center gap-2 md:gap-0">
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

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full md:w-auto bg-[#4e4b4b] shadow-lg z-50 max-h-64 overflow-auto"
                >
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 p-3 cursor-pointer text-white hover:bg-white/10"
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setLanguageOpen(false);
                        window.changeLanguage(lang.code);
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center">
            <button
              className="bg-red-600 text-white h-[45px] w-full md:w-[60%] hover:bg-red-700 transition-colors"
              onClick={() => setShowPopup(true)}
            >
              Login
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 bg-black/95 z-50 p-4 md:hidden"
            >
              <button
                className="text-white absolute top-4 right-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
              <div className="mt-12">
                {menuItems.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-center">
                      <button
                        className="text-white py-2"
                        onClick={() => {
                          if (item.submenu) {
                            toggleMobileMenu(item.title);
                          } else {
                            handleNavigation(item.path);
                          }
                        }}
                      >
                        {item.title}
                      </button>
                      {item.submenu && (
                        <button
                          className="text-white/70"
                          onClick={() => toggleMobileMenu(item.title)}
                        >
                          {expandedMobileMenus.includes(item.title) ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {item.submenu && expandedMobileMenus.includes(item.title) && (
                      <div className="ml-4">
                        {item.submenu.map((subItem, subIndex) => (
                          <div key={subIndex} className="mt-2">
                            {subItem.submenu ? (
                              <>
                                <div className="flex justify-between items-center">
                                  <button
                                    className="text-white py-2"
                                    onClick={() => {
                                      if (subItem.submenu) {
                                        toggleMobileMenu(subItem.title);
                                      } else {
                                        handleNavigation(subItem.path);
                                      }
                                    }}
                                  >
                                    {subItem.title}
                                  </button>
                                  {subItem.submenu && (
                                    <button
                                      className="text-white/70"
                                      onClick={() => toggleMobileMenu(subItem.title)}
                                    >
                                      {expandedMobileMenus.includes(subItem.title) ? '−' : '+'}
                                    </button>
                                  )}
                                </div>
                                {subItem.submenu && expandedMobileMenus.includes(subItem.title) && (
                                  <div className="ml-4">
                                    {subItem.submenu.map((subSubItem, subSubIndex) => (
                                      <button
                                        key={subSubIndex}
                                        className="text-white py-2 block"
                                        onClick={() => handleNavigation(subSubItem.path)}
                                      >
                                        {subSubItem.title}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <button
                                className="text-white py-2 block"
                                onClick={() => handleNavigation(subItem.path)}
                              >
                                {subItem.title}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-8">
                  <div className="mb-4">
                    <button
                      className="flex items-center gap-2 h-[45px] text-white bg-[#4e4b4b] w-full justify-center"
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
                      <div className="mt-2 bg-[#4e4b4b]">
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
                  <button
                    className="bg-red-600 text-white h-[45px] w-full hover:bg-red-700 transition-colors"
                    onClick={() => {
                      setShowPopup(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={pendingRoute || '/login'}
      />
    </>
  );
}

export default BankingNavBar;