/* eslint-disable react/prop-types */
import {} from 'react'

function Background(props) {
  return (
    <div className='bg-white min-h-screen max-w-screen overflow-hidden flex items-center justify-center md:px-16'>  
      <div className='relative w-full max-w-lg'>
        <div className=' absolute top-0 -left-[10rem] w-[35rem] h-[35rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
        <div className=' absolute top-10 -right-[10rem] w-[35rem] h-[35rem] bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
        <div className=' absolute bottom-20 -left-10 w-[35rem] h-[35rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
        <div className='relative z-90'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Background