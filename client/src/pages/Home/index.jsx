import { useContext } from 'react'
import Auth from '../../components/Auth'
import { AuthContext } from '../../Contexts/AuthContext'
import GamePage from '../GamePage'

function Home() {
  const { isAuth } = useContext(AuthContext)
  return (
    <div className='md:px-[2rem] lg:px-[6rem] px-4 py-[5rem] min-h-[100vh]'>
      <h1 className="text-4xl text-center font-black w-full ">
        Welcome to Multi Tic Tac Toe!
      </h1>
      {isAuth ? <GamePage /> : <Auth />}
    </div>
  )
}

export default Home