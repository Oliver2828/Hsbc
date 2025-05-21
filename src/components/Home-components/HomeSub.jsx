import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Popup from '../Pop-up-component/Popup'

function HomeSub() {
  const [showPopup, setShowPopup] = useState(false)
  const [proceedTo, setProceedTo] = useState('')
  const navigate = useNavigate()

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const hoverEffect = {
    scale: 1.05,
    originX: 0,
    transition: { type: 'spring', stiffness: 300 }
  }

  const tapEffect = {
    y: 2,
    transition: { duration: 0.1 }
  }

  const containerAnimation = {
    hidden: { y: -20, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    visible: { 
      y: 0, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.5,
        shadow: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    }
  }

  const items = [
    { label: 'HSBC Korea',     path: '/korea' },
    { label: 'Global Markets', path: '/market' },
    { label: 'Global Banking', path: '/banking' },
  ]

  const handleLinkClick = (e, path) => {
    e.preventDefault()
    setProceedTo(path)
    setShowPopup(true)
  }

  return (
    <>
      <motion.div 
        className="bg-white border-b border-gray-200 grid h-[10vh]"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center">
          <motion.ul 
            className="flex gap-[30px] text-[17px] pl-[95px] font-serif"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map(({ label, path }, idx) => (
              <motion.li 
                key={idx}
                variants={itemVariants}
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                <a
                  href={path}
                  className="relative block"
                  onClick={e => handleLinkClick(e, path)}
                >
                  {label}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={proceedTo}
      />
    </>
  )
}

export default HomeSub
