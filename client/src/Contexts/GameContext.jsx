/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [ channel, setChannel ] = useState(null);
  const [ board, setBoard ] = useState(Array(9).fill(''));
  const [ player, setPlayer ] = useState('X');
  const [ turn, setTurn ] = useState('X');
  const [ result, setResult ] = useState({ winner: 'none', state: 'none' });

  return (
    <GameContext.Provider
      value={{
        channel,
        setChannel,
        board,
        setBoard,
        player,
        setPlayer,
        turn,
        setTurn,
        result, 
        setResult,
      }}
      >
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;