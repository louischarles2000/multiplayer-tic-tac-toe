import { useContext } from 'react'
import './App.css'
import Home from './pages/Home'
import Background from './HOC/Background'
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import { AuthContext } from './Contexts/AuthContext';

const apiKey = "zvxx38u6rszp"
// const secret = "a6sjfqkkfku8shjwcdsja9fcdbnymam2yatzqjhau542a4s9j7cj5tahyz2j725b"

function App() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(apiKey);

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
    <Background>
      <Home />

      {/* LOGOUT */}
      {isAuth &&
      <button
        onClick={logout}
        className='absolute top-3 right-3 bg-[red] p-2 text-white rounded-md text-sm'>
        Logout
      </button>}
    </Background>
  )
}

export default App
