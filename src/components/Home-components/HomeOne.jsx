import React from 'react';
import { motion } from 'framer-motion';

function HomeOne() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
    <motion.div 
      className='bg-white h-[70vh] grid grid-rows-12'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.div 
          className='bg-[url(././assets/homepage.jpg)] bg-center bg-cover row-span-5 my-[20px]'
          variants={imageVariants}
        />
        
        <motion.div 
          className='row-span-7 flex flex-col gap-[30px] pl-[95px] justify-center'
          variants={containerVariants}
        >
            <motion.h2 
              className='text-[50px] font-light'
              variants={textVariants}
            >
              Welcome to HSBC Korea
            </motion.h2>
            
            <motion.h5 
              className='text-[20px]'
              variants={textVariants}
            >
              Connecting customers to opportunities
            </motion.h5>
            
            <motion.p 
              className='text-[15px]'
              variants={textVariants}
            >
              HSBC connects Korean and multinational companies to opportunities in the world based on the extensive global <br />
              network and the expertise in the Korean market. HSBC in Korea also provides tailored financial solutions to Korea’s <br />
              financial institutions and public sector companies.
            </motion.p>
        </motion.div>
    </motion.div>
    </>
  )
}

export default HomeOne;