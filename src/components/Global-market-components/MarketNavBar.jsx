import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Popup from '../Pop-up-component/Popup';

function BankingNavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Insight',
      submenu: [
        { 
          title: 'Insight',
          path: '/market/insight',
        },
        
      ]
    },
    { 
      title: 'Solutions',
      submenu: [
        { 
          title: 'Solution',
          path: '/market/solution',
        },
        
      ]
    },
    { 
      title: 'Events',
      submenu: [
        { title: 'History', path: '/market/event' },
        
      ]
    },
     { 
      title: 'Financial Regulation',
      submenu: [
        { title: 'History', path: '/market/finacial' },
       
      ]
    },
     { 
      title: 'About us',
      submenu: [
        { title: 'History', path: '/market/about' },
 
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const requestRoute = (path) => {
    setPendingRoute(path);
    setShowPopup(true);
  };

  return (
    <>
      <motion.div
        className="bg-black  grid grid-cols-12 h-[11vh] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className="flex col-span-2 justify-end items-center pr-[40px]">
          <a href="/market">
            <div className="bg-[url(././assets/hsbc.svg)] bg-center bg-contain w-[80px] h-[40px] bg-no-repeat" />
          </a>
        </div>

        {/* Menu Items */}
        <div className="flex items-center   col-span-6">
          <ul className="flex gap-[20px] pl-[40px] text-white text-[15px] font-serif font-light">
            {menuItems.map((item, index) => {
              // pick the first child path for click
              const firstPath = item.submenu[0]?.path || '/';
              const onClickHandler = ['Markets and Securities Services', 'About HSBC Korea']
                .includes(item.title)
                ? () => requestRoute(firstPath)
                : () => handleNavigation(firstPath);

              return (
                <li key={index} className="py-2 px-2">
                  <motion.span
                    className="cursor-pointer text-white"
                    whileHover={{ scale: 1.05, color: '#e3342f' }}
                    transition={{ duration: 0.2 }}
                    onClick={onClickHandler}
                  >
                    {item.title}
                  </motion.span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Login Button */}
        <div className="col-span-4 pl-[120px]  flex items-center justify-center">
          <button
            className="bg-red-600 text-white h-[45px]  w-[40%] hover:bg-red-700 transition-colors"
            onClick={() => setShowPopup(true)}
          >
            Login
          </button>
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
