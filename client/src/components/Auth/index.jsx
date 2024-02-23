import { useContext, useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import { AuthContext } from '../../Contexts/AuthContext'

function Auth() {
  const { isLogin } = useContext(AuthContext)
  return (
    <div className='mt-[2rem]'>
      <h2 className='font-bold text-xl text-center'>{isLogin ? 'Login' : 'Sign up'} to start</h2>
      {isLogin ?
      <Login /> :
      <Signup />
      }
    </div>
  )
}

export default Auth