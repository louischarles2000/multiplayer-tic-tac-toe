/* eslint-disable react/prop-types */
import {} from 'react'

function Card(props) {
  return (
    <div className={'bg-white p-5 my-4 rounded-sm shadow-sm space-y-4 ' + props.className}>
      {props.children}
    </div>
  )
}

export default Card