import React from 'react';
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';

function BankingFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <div className='min-h-[80vh] grid grid-rows-12'>
        {/* Back to Top Section */}
        <motion.div 
          className='bg-gray-100 grid row-span-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='mt-[40px] gap-[10px] flex justify-center items-center'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='cursor-pointer flex items-center'
              onClick={scrollToTop}
            >
              <IoIosArrowRoundUp size={35} className='text-white bg-black h-[50px]  p-2' />
              <p className='hover:underline ml-2'>Back to top</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Section */}
        <div className='bg-[#353333] grid grid-cols-12 row-span-8'>
          <div className='col-span-3 flex items-center'>
            <motion.ul 
              className='flex flex-col gap-[5px] pl-[95px] text-[white] text-[17px] font-serif font-light'
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={itemVariants} className='text-[30px] mb-4'>Resources</motion.li>
              {['Interest rates', 'Electronic Banking Dispute Settlement', 
                'Use of Electronic Financial Services', 'Disclaimer'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className='hover:underline cursor-pointer flex gap-1 items-center'
                  whileHover={{ x: 5 }}
                >
                  {item}
                  <motion.span whileHover={{ x: 5 }}>
                    <MdOutlineKeyboardArrowRight />
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className='col-span-3 flex items-center'>
            <motion.ul 
              className='flex flex-col gap-[5px] pt-[45px] pl-[95px] text-[white] text-[17px] font-serif font-light'
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={itemVariants} className='text-[30px] mb-4'>Tools</motion.li>
              {['Right to Ask for Lower Interest Rate (408KB, PDF)', 
                'Regulation on Prevention of Unsound Sales Activity (51KB, PDF)', 
                'Staff Information – Sales Activities via Visits and Telephone (265KB, PDF)'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className='flex gap-0.5 hover:underline cursor-pointer items-center'
                  whileHover={{ x: 5 }}
                >
                  {item}
                  <motion.span whileHover={{ x: 5 }}>
                    <MdOutlineKeyboardArrowRight />
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className='col-span-6'></div>
        </div>

        {/* Footer Bottom Section */}
        <motion.div 
          className='bg-black grid-rows-2 grid row-span-2'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className='flex justify-center'>
            <motion.ul 
              className='flex items-center pr-[50px] text-white gap-[45px]'
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {['How Your Credit Information is Used', 'Personal Information Processing Guideline',
                'Terms of Use', 'Hyperlink Policy', 'FAQ', 'HSBC Group'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className='hover:underline cursor-pointer'
                  whileHover={{ scale: 1.05 }}
                >
                  <a href="">{item}</a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          
          <motion.div 
            className='flex items-center pl-[95px] text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>© HSBC Bank 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default BankingFooter;