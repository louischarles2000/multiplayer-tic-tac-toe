/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function LinkButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.center && ' block mx-auto '} text-orange-400 disabled:cursor-not-allowed disabled:bg-gray-400 border-none text-center hover:underline capitalize`}
      disabled={props.disabled}
      >
      {props.children}
    </button>
  )
}

export default LinkButton