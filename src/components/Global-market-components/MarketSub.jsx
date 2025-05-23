import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
<FaArrowLeftLong />


function MarketSub() {
  return (
    <>
        <div className=' bg-black h-[10vh] grid'>
            <div className=' hover:underline mx-[95px] items-center text-white border-t border-gray-500 flex gap-[10px] '>
                <FaArrowLeftLong size={20}  />
                <p>Back to products & solutions</p>
            </div>
        </div>
    
    </>
  )
}

export default MarketSub