import { useContext, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext';
import GameBoard from './GameBoard';
import ChatRoom from './ChatRoom';
import LinkButton from '../../components/Common/LinkButton';

function GameRoom() {
  const { channel, setChannel } = useContext(GameContext);
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

  const leaveGame = async () => {
    await channel.stopWatching();
    setChannel(null);
  }
  
  return (
    <div className='my-5'>
      <h4 className='text-center'>Game Started</h4>
      <div className=''>
        {/* Game Board */}
        <GameBoard />
        
        {/* Chat */}
        <ChatRoom />
      </div>
      {/* Leave Game Button */}
      <LinkButton 
        center
        onClick={leaveGame}
        >Leave Game
      </LinkButton>
    </div>
  )
}

export default GameRoom