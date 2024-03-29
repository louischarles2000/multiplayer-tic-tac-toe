import { useContext } from 'react';
import './App.css';
import Background from './HOC/Background';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { AuthContext } from './Contexts/AuthContext';
import GamePage from './pages/GamePage';
import Auth from './components/Auth';

function App() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_CHAT_API_KEY);

  if(token){
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get('username'),
      firstName: cookies.get('firstName'),
      lastName: cookies.get('lastName'),
      hashedPassword: cookies.get('hashedPassword'),
    },
    token
    )
    .then((user) => {
      console.log(user);
      setIsAuth(true)
    })
  }

  return (
    <Background>
      <div className='md:px-[2rem] lg:px-[6rem] px-4 py-[5rem] min-h-[100vh]'>
        <h1 className="text-4xl text-center font-black w-full ">
          {isAuth ? 'Tic Tac Toe' : 'Welcome to Multi Tic Tac Toe!'}
        </h1>
        {isAuth ? 
        <Chat client={client}>
          <GamePage />
        </Chat>
        : <Auth />}
      </div>
    </Background>
  )
}

export default App
