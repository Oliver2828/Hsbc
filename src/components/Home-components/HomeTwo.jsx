// HomeTwo.jsx
import React, { useState } from 'react'
import { MdArrowForwardIos } from "react-icons/md"
import Popup from '../Pop-up-component/Popup'               // ← adjust path as needed
import { useNavigate } from 'react-router-dom'

import GlobalMarketsImage from '../../assets/global-markets.jpg'
import CorporateCardImage from '../../assets/corporate-card-launches.jpg'

const HomeTwo = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [proceedTo, setProceedTo] = useState('')
  const navigate = useNavigate()

  // Handler when any link is clicked
  const handleLinkClick = (e, path) => {
    e.preventDefault()
    setProceedTo(path)
    setShowPopup(true)
  }

  return (
    <>
      <div className="flex min-h-screen bg-white">
        {/* Left Content Column */}
        <div className="w-2/3 pl-[95px] p-12">
          {/* Top Row */}
          <div className="flex gap-8 mb-12">
            {/* Global Banking */}
            <div className="w-1/2">
              <div className="h-48 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={GlobalMarketsImage} 
                  className="object-cover h-full w-full" 
                  alt="Global Markets" 
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 hover:underline cursor-pointer mb-4">
                <a
                  href="/global-banking"
                  className="flex items-center gap-[10px]"
                  onClick={e => handleLinkClick(e, '/banking')}
                >
                  Global Banking and Markets 
                  <span><MdArrowForwardIos /></span>
                </a>
              </h2>
              <p className="text-base text-gray-600 mb-6">
                Connecting institutional investors to global growth opportunities, with dedicated local support and expertise. HSBC opens global market opportunities.
              </p>
            </div>

            {/* Corporate Card */}
            <div className="w-1/2">
              <div className="h-48 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={CorporateCardImage} 
                  className="object-cover h-full w-full" 
                  alt="Corporate Card Launch" 
                />
              </div>
              <h3 className="text-lg flex items-center gap-[20px] hover:underline cursor-pointer font-semibold text-gray-800 mb-4">
                <a
                  href="/corporate-card"
                  className="flex gap-[10px]"
                  onClick={e => handleLinkClick(e, '/corporate-card')}
                >
                  HSBC’s first co-branded corporate card<br/>
                  launches in Korea 
                  <span className='pt-[5px]'><MdArrowForwardIos /></span>
                </a>
              </h3>
              <p className="text-base text-gray-600">
                HSBC launched the first co-branded corporate credit card in Korea, in partnership with Kookmin Card (KB), one of the top Korean card issuing companies, in March 2021.
              </p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex gap-8">
            {/* Notices */}
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 hover:underline cursor-pointer mb-4">
                <a
                  href="/notices"
                  onClick={e => handleLinkClick(e, '/notices')}
                >
                  Notices ⫸
                </a>
              </h2>
              <p className="text-base text-gray-600">
                Get the latest news, analysis and commentary from our business specialists by visiting the News and Insight section on our global corporate website.
              </p>
            </div>

            {/* About HSBC */}
            <div className="w-1/2">
              <h2 className="text-xl font-bold text-gray-800 hover:underline cursor-pointer mb-4">
                <a
                  href="/about-hsbc"
                  className='flex items-center gap-[10px]'
                  onClick={e => handleLinkClick(e, '/korea')}
                >
                  ABOUT HSBC <span><MdArrowForwardIos /></span>
                </a>
              </h2>
              <p className="text-base text-gray-600">
                HSBC connects Korean and multinational companies to opportunities in the world based on the extensive global network and the expertise in the Korean market. HSBC in Korea also provides tailored financial solutions to Korea’s financial institutions and public sector companies.
              </p>
            </div>
          </div>
        </div>

        {/* Right White Space */}
        <div className="w-1/3 bg-white"></div>
      </div>

      {/* Popup Instance */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={proceedTo}
      />
    </>
  )
}

export default HomeTwo
