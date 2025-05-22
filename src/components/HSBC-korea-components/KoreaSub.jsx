import React from 'react';
import { motion } from 'framer-motion';

function KoreaSub() {
  const linkVariants = {
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const underlineVariants = {
    hover: {
      width: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className='bg-white grid grid-cols-12 h-[9vh]'>
        <div className='flex col-span-2 justify-end items-center pl-[40px]'>
          <a href="/">
            <div className='bg-[url(././assets/hsbc-logo.svg)] bg-center bg-contain w-[100px] h-[40px] bg-no-repeat'></div>
          </a>
        </div>
        
        <div className='mx-[20px] my-[20px] grid grid-cols-3 col-span-5'>
          {/* HSBC in Korea */}
          <div className='flex items-center border-r border-gray-400 justify-center text-[20px]'>
            <motion.a 
              href=""
              className='relative'
              whileHover="hover"
            >
              <motion.span variants={linkVariants}>HSBC in Korea</motion.span>
              <motion.div
                className='absolute bottom-0 left-0 h-px bg-black'
                variants={underlineVariants}
                style={{ width: 0 }}
              />
            </motion.a>
          </div>

          {/* News and media */}
          <div className='flex items-center border-r border-gray-400 justify-center text-[20px]'>
            <motion.a 
              href=""
              className='relative'
              whileHover="hover"
            >
              <motion.span variants={linkVariants}>News and media</motion.span>
              <motion.div
                className='absolute bottom-0 left-0 h-px bg-black'
                variants={underlineVariants}
                style={{ width: 0 }}
              />
            </motion.a>
          </div>

          {/* Careers */}
          <div className='flex items-center border-r border-gray-400 justify-center text-[20px]'>
            <motion.a 
              href=""
              className='relative'
              whileHover="hover"
            >
              <motion.span variants={linkVariants}>Careers</motion.span>
              <motion.div
                className='absolute bottom-0 left-0 h-px bg-black'
                variants={underlineVariants}
                style={{ width: 0 }}
              />
            </motion.a>
          </div>
        </div>

        <div className='col-span-5'></div>
      </div>
    </>
  )
}

export default KoreaSub;