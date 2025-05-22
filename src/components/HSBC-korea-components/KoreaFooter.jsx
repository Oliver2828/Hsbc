import React from 'react'
import { motion } from 'framer-motion';

function KoreaFooter() {

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };
  return (
    <>
    
    <div className=' bg-black grid h-[10vh]'>

      <div className='text-white grid grid-cols-12 row-span-2 font-serif'>
        <div className='flex  col-span-9 items-center text-[15px]'>
          <motion.ul className='flex gap-[30px] pl-[125px]'>
            {[ "Personal Information Processing Guideline (635 KB, PDF)", "Terms of use", "Hyperlink policy"].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                custom={index}
                className='relative hover:underline cursor-pointer'
              >
                <a href="" className='block pb-1'>
                  {item}
                  <motion.span
                    className='absolute bottom-0 left-0 h-px bg-white'
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.div 
          className='flex items-center col-span-3 pl-[70px] text-[14px]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>© HSBC Group 2025</p>
        </motion.div>
      </div>
    </div>
    
    </>
  )
}

export default KoreaFooter