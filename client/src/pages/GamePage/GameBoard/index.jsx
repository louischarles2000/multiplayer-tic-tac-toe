import { useCallback, useContext, useEffect } from 'react'
import Squar from './Squar'
import Card from '../../../components/Common/Card'
import { GameContext } from '../../../Contexts/GameContext'
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { winnigPatterns } from '../../../utilities/constatns';
import LinkButton from '../../../components/Common/LinkButton';

function GameBoard() {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const { 
    board, setBoard, 
    turn, setTurn, 
    player, setPlayer,
    result, setResult,
  } = useContext(GameContext);

  const chooseSquare = async (square) => {
    if(turn === player && board[square] === '' && result.state === 'none') {
      // Do the action
      setTurn(player === 'X' ? 'O' : 'X');

      await channel.sendEvent({
        type: 'game_move',
        data: { square, player }
      })

      setBoard(board.map((val, idx) => {
        if(idx === square && val === '') {
          return player;
        }
        return val;
      }));
    }
  };

  const checkWin = useCallback(() => {
    winnigPatterns.forEach(currPattern => {
      const firstPlayer = board[currPattern[0]]
      if (firstPlayer === '') return;
      let foundWinningPattern = true;
      currPattern.forEach(idx => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        // alert(`Winner is ${board[currPattern[0]]}`)
        setResult({
          winner: board[currPattern[0]],
          state: 'Won'
        })
      }
    });
  }, [setResult, board]);

  const checkIfTie = useCallback(() => {
    let filled = true;
    board.forEach(square => {
      if(square == ''){
        filled = false;
      }
    });
    if(filled && result.state === 'none'){
      // alert(`It's a Tie!`)
      setResult({
        winner: 'none',
        state: 'Tie'
      })
      
    }
  }, [board, setResult, result]);

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board, checkWin, checkIfTie]);  

  const restartGame = async () => {    
    await channel.sendEvent({
      type: 'restart',
      data: { player }
    });
    setBoard(Array(9).fill(''));
    setTurn(player);
    setResult({
      winner: 'none',
      state: 'none',
    });
  }

  channel.on((event) => {
    // If there's move from the oponent
    if(event.type === 'game_move' && event.user.id !== client.userID){
      const curr_player = event.data.player === 'X' ? 'O' : 'X';
      setPlayer(curr_player);
      setTurn(curr_player);

      setBoard(board.map((val, idx) => {
        if(idx === event.data.square && val === '') {
          return event.data.player;
        }
        return val;
      }));
    }
  });

  channel.on((event) => {
    if(event.type === 'restart' && event.user.id !== client.userID){ 
      setBoard(Array(9).fill(''));
      setTurn(player);
      setResult({
        winner: 'none',
        state: 'none',
      });
    }
  })

  return (
    <Card className="inline-block mx-auto">
      <div className='inline-block border-[1px] border-[#555]'>
        <div className='grid grid-cols-3 gap-0'>
          {board.map((sq, index) => (
            <Squar 
              val={sq}
              key={index}
              onClick={() => chooseSquare(index)}
              />
          ))}
        </div>
      </div>

    {result.state === 'Won' && 
      <p className='text-center'>{`"${result.winner}" WON THE GAME!`}</p>
    }
    
    {result.state === 'Tie' && 
      <p className='text-center'>{`IT'S A TIE!`}</p>
    }

    {(result.state !== 'none') &&
    <LinkButton
      center
      onClick={restartGame}
      >Restart Game
    </LinkButton>}

    </Card>
  )
}

export default GameBoard