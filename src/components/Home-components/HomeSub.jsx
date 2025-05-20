import React from 'react';
import { motion } from 'framer-motion';

function HomeSub() {
  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const hoverEffect = {
    scale: 1.05,
    originX: 0,
    transition: { type: 'spring', stiffness: 300 }
  };

  const tapEffect = {
    y: 2,
    transition: { duration: 0.1 }
  };

  // Container animation
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
  };

  return (
    <>
      <motion.div 
        className='bg-white border-b border-gray-200 grid h-[10vh]'
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className='flex items-center'>
          <motion.ul 
            className='flex gap-[30px] text-[17px] pl-[95px] font-serif'
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {["HSBC Korea", "Global Markets", "Global Banking"].map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                <a href="#" className='relative block'>
                  {item}
                  <motion.span 
                    className='absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300'
                    whileHover={{ width: '100%' }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
}

export default HomeSub;