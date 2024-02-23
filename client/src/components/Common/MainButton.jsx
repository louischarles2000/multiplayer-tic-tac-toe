/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function MainButton(props) {
  return (
    <button
      onClick={props.onClick}
      className='bg-purple-400 disabled:cursor-not-allowed disabled:bg-gray-400 w-full rounded-sm border-none text-white p-2 shadow-md capitalize'
      disabled={props.disabled || props.loading}
      >
      {props.loading ? 'Loading...' : props.children}
    </button>
  )
}

export default MainButton