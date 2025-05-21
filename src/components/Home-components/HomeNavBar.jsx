import React, { useState } from 'react'
import Popup from '../Pop-up-component/Popup' // Adjust the path if it's in a different directory
import { useNavigate } from 'react-router-dom'

function HomeNavBar() {
  const [showLangOptions, setShowLangOptions] = useState(false)
  const [selectedLang, setSelectedLang] = useState('Korea')
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  const languages = [
    { code: 'KR', name: 'Korea', flag: '🇰🇷' },
    { code: 'US', name: 'English', flag: '🇺🇸' },
  ]

  return (
    <>
      <div className='bg-white h-[11vh] border-b border-gray-200 grid grid-cols-12'>
        {/* Logo */}
        <div className='flex col-span-2 justify-end items-center pr-[40px]'>
          <div className='bg-[url(././assets/hsbc-logo.svg)] bg-center bg-contain w-[100px] h-[40px] bg-no-repeat'></div>
        </div>

        <div className='col-span-7'></div>

        {/* Buttons */}
        <div className='flex flex-row col-span-3 gap-[20px]'>
          <div className='flex items-center justify-center w-[50%]'>
            <button
              className='bg-red-600 text-white h-[45px] w-[80%] hover:bg-red-700 transition-colors'
              onClick={() => setShowPopup(true)}
            >
              Login
            </button>
          </div>

          {/* Language Selector */}
          <div className='w-[50%] flex justify-center items-center border-x-1 my-[20px] mr-[50px] relative'>
            <div
              className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg'
              onClick={() => setShowLangOptions(!showLangOptions)}
            >
              <span>{languages.find(l => l.name === selectedLang)?.flag}</span>
              <span className='text-[15px] font-light'>{selectedLang}</span>
              <span className={`transform transition-transform ${showLangOptions ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {showLangOptions && (
              <div className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className='flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setSelectedLang(lang.name)
                      setShowLangOptions(false)
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span className='text-[14px]'>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔽 Popup for Login */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo="/login" // 🔀 Where you want to navigate
      />
    </>
  )
}

export default HomeNavBar
