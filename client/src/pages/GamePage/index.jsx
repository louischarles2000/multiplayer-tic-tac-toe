import { useContext } from 'react'
import Cookies from 'universal-cookie'
import JoinGame from './JoinGame';
import { Channel, useChatContext } from 'stream-chat-react';
import { GameContext } from '../../Contexts/GameContext';
import GameRoom from './GameRoom';
import { AuthContext } from '../../Contexts/AuthContext';

function GamePage() {
  const { setIsAuth } = useContext(AuthContext)
  const { channel } = useContext(GameContext);
  const { client } = useChatContext();
  const cookies = new Cookies();
  const firstName = cookies.get('firstName');
  
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  }

  return (
    <div>
      <div className='absolute top-3 right-0 px-3 flex w-full justify-between items-center'>
        <h1 className='text-sm text-[#555]'>Welcome {firstName}!</h1>
        <button
          onClick={logout}
          className=' bg-[red] p-1 text-white rounded-md text-[10px]'>
          Logout
        </button>
      </div>
      {channel ?
        <Channel channel={channel}>
          <GameRoom/>
        </Channel>
        :
        <JoinGame />
        }
    </div>
  )
}

export default GamePage