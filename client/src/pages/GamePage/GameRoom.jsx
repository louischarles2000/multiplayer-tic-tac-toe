import { useContext, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext';
import ChatRoom from './ChatRoom';
import GameBoard from './GameBoard';

function GameRoom() {
  const { channel } = useContext(GameContext);
  const [ playersJoined, setPlayersJoined ] = useState(
    channel.state.watcher_count === 2
  );

  channel.on('user.watching.start', (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if(!playersJoined){
    return (
      <div className='my-8 text-center font-semibold'>
        Waiting for Rival to Join...
      </div>
    )
  }
  
  return (
    <div className='my-5'>
      <h4 className='text-center'>Game Started</h4>
      <div>
        {/* Game Board */}
        <GameBoard />

        {/* Chat */}
        <ChatRoom />
      </div>
      {/* Leave Game Button */}
    </div>
  )
}

export default GameRoom