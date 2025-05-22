import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '../Pop-up-component/Popup';

function BankingNavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Korea');
  const [activeMenuPath, setActiveMenuPath] = useState([]);
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
    { code: 'KR', name: 'Korea', flag: '🇰🇷' },
    { code: 'EN', name: 'English', flag: '🇺🇸' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setActiveMenuPath([]);
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
        className="bg-black grid grid-cols-12 h-[11vh] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex col-span-2 justify-end items-center pr-[40px]">
          <a href="/banking">
            <div className="bg-[url(././assets/hsbc.svg)] bg-center bg-contain w-[80px] h-[40px] bg-no-repeat" />
          </a>
        </div>

        <div className="flex items-center col-span-6">
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
                      // open popup for top-level click if desired
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

        <div className="grid grid-cols-2 col-span-4 items-center">
          <div className="flex items-center justify-center relative">
            <button
              className="flex items-center gap-2 h-[45px] text-white bg-[#4e4b4b] w-[170px] justify-center"
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
                  className="absolute top-full mt-2 w-full bg-[#4e4b4b]  shadow-lg z-50"
                >
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 p-3  cursor-pointer text-white"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setLanguageOpen(false);
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
              className="bg-red-600 text-white h-[45px] w-[60%] hover:bg-red-700 transition-colors "
              onClick={() => setShowPopup(true)}
            >
              Login
            </button>
          </div>
        </div>
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
