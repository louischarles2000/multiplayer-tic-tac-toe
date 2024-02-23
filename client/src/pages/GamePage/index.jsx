import { } from 'react'
import Cookies from 'universal-cookie'

function GamePage() {
  const cookies = new Cookies();
  const firstName = cookies.get('firstName');

  return (
    <div>
      <h1 className='text-2xl'>Welcome {firstName}!</h1>
      
    </div>
  )
}

export default GamePage