/* eslint-disable react/prop-types */
import {} from 'react'

function Input(props) {
  return (
    <input 
      placeholder={props.placeholder} 
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      checked={props.checked}
      style={{ width: props.type === 'checkbox' ? 'auto' : '100%'}}
      className='w-full p-2 border-[1px] border-[#ccc]'
      />
  )
}

export default Input