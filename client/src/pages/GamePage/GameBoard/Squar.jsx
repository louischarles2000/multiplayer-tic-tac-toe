/* eslint-disable react/prop-types */
import { } from 'react'

function Squar({ val, onClick }) {

  return (
    <div 
      className={`
        w-[6rem] h-[6rem] flex justify-center items-center border-[.5px] border-[#555] 
        ${val === '' ? 'bg-gray-200  cursor-pointer hover:bg-gray-50 ' : ' bg-white cursor-not-allowed '}
        
        `
      }
      onClick={onClick}
    >
      {val}
    </div>
  )
}

export default Squar