import React from 'react'
import { IoMdShare } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { motion } from 'framer-motion';

function Korea1() {
  return (
    <>
    <div className='bg-white h-[60vh] relative'>
      {/* Image Section */}
      <div className='bg-[url(././assets/korea.jpg)] h-full w-full bg-no-repeat bg-cover bg-center'></div>
      
      {/* Share Section - Positioned Over Image */}
      <motion.div 
        className='absolute bottom-0 right-1.5 -translate-x-1/2 translate-y-1/2 w-[30%] flex shadow-xl rounded-sm'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='w-[40%] flex items-center justify-center font-semibold text-white gap-[20px] text-[18px] bg-[#353333] py-4'>
          <IoMdShare size={25}/>
          <p>SHARE</p>
          
        </div>
        <div className='w-[20%] my-[10px] border-r border-gray-300 flex items-center justify-center bg-white'>
          <FaXTwitter className='text-red-500' size={30} />
        </div>
        <div className='w-[20%] my-[10px] border-r border-gray-300 flex items-center justify-center bg-white'>
          <FaFacebookF className='text-red-500' size={30} />
        </div>
        <div className='w-[20%] my-[10px] border-r border-gray-300 flex items-center justify-center bg-white'>
          <FaLinkedinIn className='text-red-500' size={30} />
        </div>
      </motion.div>
    </div>
    </>
  )
}

export default Korea1;