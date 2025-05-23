import React, { useState } from 'react'
import Popup from '../Pop-up-component/Popup'
import { useNavigate } from 'react-router-dom'

function HomeNavBar() {
  const [showLangOptions, setShowLangOptions] = useState(false)
  const [selectedLang, setSelectedLang] = useState('English')
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  const languages = [
    { code: 'ko', name: 'Korean',  flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French',  flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ar', name: 'Arabic',  flag: '🇸🇦' },
  ]

  return (
    <>
      <div className='bg-white h-[11vh] border-b border-gray-200 grid grid-cols-12'>
        {/* Logo */}
        <div className='flex col-span-2 justify-end items-center pr-[40px]'>
          <a href="/">
            <div
              className='bg-[url(././assets/hsbc-logo.svg)]
                         bg-center bg-contain
                         w-[100px] h-[40px]
                         bg-no-repeat'
            />
          </a>
        </div>

        <div className='col-span-7'></div>

        {/* Buttons */}
        <div className='flex flex-row col-span-3 gap-[20px]'>
          {/* Login */}
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
                {languages.map(lang => (
                  <div
                    key={lang.code}
                    className='flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setSelectedLang(lang.name)
                      setShowLangOptions(false)
                      changeLanguage(lang.code)
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
        proceedTo="/login"
      />
    </>
  )
}

export default HomeNavBar
