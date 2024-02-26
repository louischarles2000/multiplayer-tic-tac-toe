import { useCallback, useContext, useEffect } from 'react'
import Squar from './Squar'
import Card from '../../../components/Common/Card'
import { GameContext } from '../../../Contexts/GameContext'
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { winnigPatterns } from '../../../utilities/constatns';

function GameBoard() {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const { 
    board, setBoard, 
    turn, setTurn, 
    player, setPlayer,
    setResult,
  } = useContext(GameContext);

  const chooseSquare = async (square) => {
    if(turn === player && board[square] === '') {
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
        alert(`Winner is ${board[currPattern[0]]}`)
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
    if(filled){
      alert(`It's a Tie!`)
      setResult({
        winner: 'none',
        state: 'Tie'
      })
    }
  }, [board, setResult]);

  useEffect(() => {
    checkIfTie()
    checkWin()
  }, [board, checkWin, checkIfTie]);
  

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
    </Card>
  )
}

export default GameBoard